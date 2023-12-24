import { useSession } from "next-auth/react";
import PromptCard from "./PromptCard";
import { redirect } from "next/navigation";


interface Profiledata {
  name: string;
  desc: string;
  posts: {
    _id: number;
    creator: {
      _id: number;
      image: string;
      username: string;
      email: string;
    };
    prompt: string;
    tag: string;
}[]
  handleEdit: (e: any) => void;
  handleDelete: (e: any) => void;
}

const Profile = ({name, desc, posts, handleEdit, handleDelete}: Profiledata) => {

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {name} Profile
        </span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {posts.map((post) => (
          <PromptCard 
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  )
}


export default Profile