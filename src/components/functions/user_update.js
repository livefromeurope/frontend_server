

function User_Update(){

    const {setAuth,auth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [image, setImage] = useState('');
    const [bio, setBio] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        let registerurl = process.env.REACT_APP_AUTHSERVER_URL + 'user/register'
        let created_date = new Date().toISOString()
        let body_json = 
        {
            'user': user,
            'email': email,
            'password': pwd,
            'image': image,
            'bio': bio,
            'created_date':created_date,
        }
            await fetch(authurl, 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body_json)
            })  .then(response => response.json())
                .then(data => {
            console.log(data)
        });

    }
}

export default User_Update;
