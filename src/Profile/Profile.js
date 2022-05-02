const Profile = () => {
  let [user, setUser] = useState();
  let [email, setEmail] = useState('');
  let [loading, setLoading] = useState(false);
  let username = persistedState('username');

  let getProfile = () => {
    axios.get(API_GET_USER_PATH,{
      params: {
        username: username.toString()
      }
    }).then((response) => {
      let response_items = response.data;
      setUser(response_items["_embedded"]["user"]);
      setEmail(response_items._embedded.user.email);
    }).catch(()=>{
      toast.error('User profile unavailable.')
    })
  };

  useEffect(()=>{
    getProfile();
  },[]);
  return (
  );
}
export default Profile;