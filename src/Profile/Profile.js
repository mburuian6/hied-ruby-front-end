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

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    var data = new FormData(event.target);
    if(data.get('email') === email){
      toast.info('Email unchanged');
      return;
    }

    var username = persistedState("username");
    data.append("username", username);

    axios
      .post(API_GET_USER_PATH, Object.fromEntries(data.entries()))
      .then(() => {
        toast.info('Saved successfully');
        setLoading(false);
      })
      .catch((error) => {
        toast.error('Failed to save.');
        console.log(error.toJSON());
      });
  }

  return (
  );
}
export default Profile;