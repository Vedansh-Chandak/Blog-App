

// API_NOTIFICATION 
export const API_NOTIFICATION = {
 loading: {
    title:'Loading...',
    message: "Data is loading, please wait"
 },
 success: {
    title: 'Success',
    message: 'data fetched successfully'
 },
 responseFailure: {
    title: 'Error', 
    message: 'Error while fetching response, please try again'
 },
 requestFaliure: {
    title: 'Error',
    message: 'error while parshing request'
 },
 networkError: {
    title: 'Error', 
    message: 'unable to connect with the server, please check connection'
 }
}

/// API service Call

export const SERVICE_URL = {
    userSignup: { url: '/signup', method: 'POST'}
}