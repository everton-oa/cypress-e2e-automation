# Notes

## Cypress Pros and Cons

| PROS                                 | CONS                         |
| ------------------------------------ | ---------------------------- |
| Complete framework                   | No IE and Safari support     |
| VERY fast                            | Asynchronous code            |
| More stable                          | No mobile but mobile view    |
| Not require solid programming skills | Single domain and single tab |
| Test and mock APIs                   | Not friendly with iFrames    |
| Don't need test env                  |                              |

## Locators

- Cypress does not support xpath by default
- Use .only to execute only one specific test
- Methods to interact with elements
    - get() - Find elements on the page by locator globally
        - no matter if chains is used
    - find() - Find child elements by locator
    - contains() - Find HTML text and by text and locator
        - When 2 elements are provided inside a contains()
            - First will be the target element
            - The text can be located anywhere  
- Chain methods - It is not recommended to chain methods after the action methods (click, type, ...)
