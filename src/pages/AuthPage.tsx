import {useState} from "react";

export const AuthPage = () => {
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
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const main = <div className={"flex flex-col h-screen justify-between"}>
        <button onClick={() => setLogin(true)}>Login</button>
        <button onClick={() => setLogin(false)}>Sign-Up</button>
        <form onSubmit={LoginSubmit} className={"flex flex-col justify-center items-center"}>
            <input onChange={handleEmailChange} value={email} placeholder="Email" type="email"/>
            <input onChange={handlePasswordChange} value={password} placeholder="Password" type="password"/>
            <input type="submit" placeholder={"Submit"} value="Submit"/>
        </form>
        <button className={"p-4"}>Lost password</button>
    </div>
    return (
        <>
            {header}
            {main}
        </>
    )
}