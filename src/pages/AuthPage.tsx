import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

export const AuthPage = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const header = <div className={"flex justify-between p-5"}>
        <p>Change theme</p>
        <p>Language</p>
    </div>
    const LoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEmail(email);
        setPassword(password);
        console.log(email)
        console.log(password)
        if (email && password) {
            navigate("/dashboard")
        }
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const main = <div className={"flex flex-col h-screen justify-between items-center"}>
        <button onClick={() => setLogin(true)}>Login</button>
        <button onClick={() => setLogin(false)}>Sign-Up</button>
        <form onSubmit={LoginSubmit} className={"flex flex-col justify-center items-center"}>
            <input onChange={handleEmailChange} value={email} placeholder="Email" type="email"/>
            <input onChange={handlePasswordChange} value={password} placeholder="Password" type="password"/>
            <input type="submit" placeholder={"Submit"} value="Submit"/>
        </form>

        <Link to="/lost-password">Lost Password?</Link>
    </div>
    return (
        <>
            {header}
            {main}
        </>
    )
}