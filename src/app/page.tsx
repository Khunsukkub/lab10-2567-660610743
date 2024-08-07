"use client";

import axios from "axios";
import { useState , useEffect } from "react";
import UserCard from "@/components/UserCard";
import { cleanUser } from "@/libs/cleanUser"
import { nanoid } from "nanoid";

export default function RandomUserPage() {
  // annotate type for users state variable

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genAmount, setGenAmount] = useState<any>(1);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

    useEffect(() => {
    if(isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }
    localStorage.setItem("genAmount", genAmount.toString());
  },[genAmount]);

  useEffect(() => {
    const newAmount = localStorage.getItem("genAmount");
    if(newAmount != null)
    {
      setGenAmount(Number(newAmount));
    }
  },[]);

  const generateBtnOnClick = async () => {
    setIsLoading(true);
    const resp = await axios.get(
      `https://randomuser.me/api/?results=${genAmount}`
    );

    const users = resp.data.results;
    const cleanedUsers = users.map((user: any) => ({...cleanUser(user),key: nanoid()}));
    
    setUsers(cleanedUsers);

    setIsLoading(false);

    //Your code here
    //Process result from api response with map function. Tips use function from /src/libs/cleanUser
    //Then update state with function : setUsers(...)
  };

  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      <p className="display-4 text-center fst-italic m-4">Users Generator</p>
      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        Number of User(s)
        <input
          className="form-control text-center"
          style={{ maxWidth: "100px" }}
          type="number"
          onChange={(e) => setGenAmount(e.target.value)}
          value={genAmount}
        />
        <button className="btn btn-dark" onClick={generateBtnOnClick}>
          Generate
        </button>
      </div>
      {isLoading && (
        <p className="display-6 text-center fst-italic my-4">Loading ...</p>
      )}
      {users && !isLoading && users.map((users:any) => 
         <UserCard  
          key={users.key}
          name={users.name}
          imgUrl={users.imgUrl}
          email={users.email}
          address={users.address}/>)}
    </div>
  );
}
