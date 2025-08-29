import { useState } from "react"
import  BottomWarning  from "../components/BottomWarning.jsx"
import  Button from "../components/Button.jsx"
import  Heading from "../components/Heading.jsx"
import  InputBox from "../components/InputBox.jsx"
import  SubHeading  from "../components/SubHeading.jsx"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Signin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={e => {
          setEmail(e.target.value)
        }} placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox onChange={e => {
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async() => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
              email,
              password
            })
            localStorage.setItem("token", response.data.token)
            navigate('/dashboard')
          }} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}

export default Signin
