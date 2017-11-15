/**
 * Utility function for turning array into enums object
 * @param ...list A list of enum keys
 * @return An object with all list items as keys and values
 */
export default function enums (...list) {
  return list.reduce(
    (enums, item) => {
      enums[item] = item
      return enums
    },
    {}
  )
}
