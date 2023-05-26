import UserProfile from "@/components/user/profile";
import { UserInfo } from "@/lib/types";
import { fetcher } from "@/lib/utils";
import { redirect } from 'next/navigation';
// import { useEffect, useState } from "react";

export default async function Page({ params }: { params: { id: string } }) {

    const res = await fetcher(`http://localhost:3000/api/user/byId/${params.id}`, { next: { revalidate: 1 } });
    const userInfo: UserInfo = {
        id: res.id,
        firstName: res.firstName,
        lastName: res.lastName,
        bio: res.bio,
        ig: res.ig,
        tk: res.tk,
        image: res.image,
        email: res.email,
    }
    // const [ userInfo, setUserInfo ] = useState<UserInfo>({} as UserInfo);
    
    // useEffect(() => {
    //     getUserInfo();
    // }, []);

    // const getUserInfo = async () => {
    //     const fetchedUserInfo = await fetcher(`http://localhost:3000/api/user/byId/${params.id}`, { next: { revalidate: 10 } });
    //     setUserInfo(fetchedUserInfo);
    //     console.log("Fetched User Info:", fetchedUserInfo);
    // };
    
    console.log('userInfo', userInfo)
    // var userInfo: UserInfo = JSON.parse(res)

    // console.log('userInfo', userInfo)
    if (userInfo === null) {
        // redirect to 404
        redirect('/');
    }

    return (
        <>
            <UserProfile userInfo={userInfo}/>
        </>
    );
}