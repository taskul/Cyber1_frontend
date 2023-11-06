import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells Apollo that we'll take care of everything

    // any items in the cache are the existing items
    // the second argument is an object that we can destructure to get args and cache
    // --- args are the $skip and $first values we used to pick how many items to skip and display
    // --- cache is the Apollo cache
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      // read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      // this is the total number of products we have
      const count = data?._allProductsMeta?.count;
      // calculte the page we are currently on
      const page = skip / first + 1;
      // how many total pages there are
      const pages = Math.ceil(count / first);
      //   console.log('EXISTING', existing);

      // check if we have existing items on the page
      // we pop on filter at the end, so that way if someting is undefined, only items that are not undefined will be returned
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // if there are items and there aren't enough items to satisfy how may awere requested
      // and we are on the last page, THEN just send it
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // we don't have any items, we must go to the network to fetch them
        return false;
      }
      // if there are items, just return them from the cache, and we don't need to go to the network
      if (items.length) {
        // if there are items in the cache we are going to send them to the Apollo
        return items;
      }

      return false; // fallback to network
      // When Apollo queries the products first thing it does is asks the read function for those items
      // Here we can do one of two things:
      // First Option: return the items because they are already in the cache
      // Other Option: return false from here, which will do network request, if there is nothing in cache then make a network request
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // this runs when Apollo client comes back from the network with our products
      //   console.log(`mergin items from the network${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      //   console.log(merged);
      // finally we return the merged items form the cache
      // once the merge function returns items, the read function runs again
      return merged;
    },
  };
}
