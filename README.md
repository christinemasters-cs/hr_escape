# HR Escape

A React-based interactive mini page designed for hosting on Contentstack Launch.

## Project Structure

```
hr_escape/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── App.js              # Main React component
│   ├── App.css             # Styling for the app
│   └── index.js            # React entry point
├── package.json            # Project dependencies
├── .gitignore              # Git ignore file
└── README.md               # This file
```

## Installation

1. Clone this repository
2. 2. Install dependencies:
   3.    ```bash
            npm install
            ```

         3. Start the development server:
         4.    ```bash
                  npm start
                  ```

               4. Build for production:
               5.    ```bash
                        npm run build
                        ```

                     ## Deployment on Contentstack Launch

                 This project is configured to work seamlessly with Contentstack Launch:

           1. Push this repository to GitHub
           2. 2. Go to Contentstack and click Launch
              3. 3. Create a new project and select "Import from GitHub"
                 4. 4. Select this repository
                    5. 5. Contentstack will auto-detect React and configure the build settings:
                       6.    - Build Command: `npm run build`
                             -    - Output Directory: `build`
                                  - 6. Deploy and your site will be live!
                                   
                                    7. ## Customization
                                   
                                    8. - **Edit App.js** to change the main content
                                       - - **Edit App.css** to customize styling
                                         - - Add new React components in the `src` folder
                                           - - Install additional npm packages as needed
                                            
                                             - ## Available Scripts
                                            
                                             - - `npm start` - Runs the app in development mode
                                               - - `npm build` - Builds the app for production
                                                 - - `npm test` - Runs tests
                                                   - - `npm eject` - Ejects from Create React App (irreversible)
                                                    
                                                     - ## Technologies Used
                                                    
                                                     - - React 18
                                                       - - ReactDOM
                                                         - - CSS3
                                                           - - Contentstack Launch
                                                            
                                                             - ## License
                                                            
                                                             - This project is licensed under the MIT License.
