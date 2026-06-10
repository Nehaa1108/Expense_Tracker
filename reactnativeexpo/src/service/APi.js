// import axios from 'axios';

// let setLoadingFunction = null; 

// // Function to set the global loading function
// export const setGlobalLoading = (setLoading) => {
//   setLoadingFunction = setLoading;
// };

// const api = axios.create({
 
//   baseURL:'http://xxxxxx.xxxx.co.in/xxx.php/',
// });

// export const mediaURL = "https://xxxx.xxx.co.in/uploads/";


// // Request interceptor to show loading before API calls
// api.interceptors.request.use(
//   (config) => {
//     // Show loader before request
//     if (setLoadingFunction) setLoadingFunction(true);

//     // Add authentication token if available
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
    
//     config.headers['Basic'] = 'xxxxx';
//     return config;
//   },
//   (error) => {
//     // Hide loader if request fails
//     if (setLoadingFunction) setLoadingFunction(false);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to hide loading after API response
// api.interceptors.response.use(
//   (response) => {
//     if (setLoadingFunction) setLoadingFunction(false);
//     return response;
//   },
//   (error) => {
//     // Hide loader on API error
//     if (setLoadingFunction) setLoadingFunction(false);

//     // Handle unauthorized access (401) globally
//     if (error.response && error.response.status === 401) {
//       console.error('Unauthorized. Redirecting to login...');
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;



