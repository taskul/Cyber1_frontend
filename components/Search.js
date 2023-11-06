import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/dist/client/router';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    # we are running allProducts query and then assign the results to searchTerms variable.
    # OR means we are looking for search term in name or description, and we pass it an array of objects, there is also AND operator that we can use
    # name_contains_i looks for a name that contains and "i" means case insensitive
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

// Downshift is a packate that - Primitives to build simple, flexible, WAI-ARIA compliant React autocomplete, combobox or select dropdown components.
export default function Search() {
  const router = useRouter();
  // because we don't want this fire when component renders, but rather when we want it we'll use useLazyQuery instead of useQuery
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      // This means that it will bypass the Apollo cache and always go to the network to fetch data
      fetchPolicy: 'no-cache',
    }
  );
  // we are creating an array that we can populate with search items returned so we could display them to the user
  const items = data?.searchTerms || [];

  // findItems will make network requests at every change in input, however that can quickly DDOS our own server, so we use debounce() and pass it a function we want to wait between each envoking, and we pass the time to wait which is 350miliseconds.
  const findItemsButChill = debounce(findItems, 350);

  // this takes care of any server side rendering issues
  resetIdCounter();
  // these methods that useCombobox returns are making our search and drop down menu keyboard accessible, also includes dropdown open/closed state
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    // This will fire when someone types input into the box
    onInputValueChange() {
      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    // this will fire when someone will select an item from the dropdown
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/product/${selectedItem.id}`,
      });
    },
    // we have this here because when we select an item from drop down menu the text in the search input field changes to [object][object], and this little function will keep it as a string
    itemToString: (item) => item?.name || '',
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an Item',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              key={item.it}
              {...getItemProps({ item })}
              highlighted={index === highlightedIndex}
            >
              <img
                src={item.photo.image.publicUrlTransformed}
                alt={item.name}
                width="50"
              />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>
            Sorry, No Items found matching {inputValue}
          </DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
