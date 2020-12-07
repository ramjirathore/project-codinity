import React from "react"

import { storage } from "../../config/fbConfig"
import { useAuth } from "../../contexts/AuthContext"

export const SideDrawer = (props) => {

    const { currentUser } = useAuth();

    const onChange = (e) => {
        const file = e.target.files[0];
        const storageRef = storage.ref();
        const fileRef = storageRef.child('videos/' + currentUser.uid + '/' + file.name);
        fileRef.put(file);
    }

    return (
        <div>
            Codinity
            <input type="file" onChange={onChange} />
        </div>
    )
}

export default SideDrawer;