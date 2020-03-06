export default function({ $axios, redirect }) {
  const BaseURL = 'http://http://localhost:3000/admin/api/'
  $axios.setBaseURL(BaseURL)
  
  $axios.onError(error => {
    if (error.response.status === 500) {
      redirect("/sorry");
    }
  });
}
