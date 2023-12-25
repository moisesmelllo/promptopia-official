'use client'

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface PromptCardProps {
  post: {
    creator: {
      _id: number
      image: string;
      username: string;
      email: string;
    }
    prompt: string;
    tag: string;
  };
  handleTagClick?: (tag: string) => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
}


const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}: PromptCardProps) => {
  const router = useRouter()
  const [copied, setCopied] = useState('')
  const {data: session} = useSession()
  const pathname = usePathname()

  const handleCopy = () => {
    setCopied(post.prompt!);
    navigator.clipboard.writeText(post.prompt!)
    setTimeout(() => setCopied(''), 3000);
  }

  function goToProfile(username: string) {
    router.push(`profile/${username}`)
  }

  return (
    <div className="prompt_card mb-2 ">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image 
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
            onClick={() => goToProfile(post.creator.username)}
          />
        </div>
        <div className="flex flex-col">
          <h3 className="font-satoshi font-semibold text-gray-900">
            {post.creator.username}
          </h3>
          <p className="font-inter text-sm text-gray-500">
            {post.creator.email}
          </p>
        </div>
      <div className="copy-btn" onClick={handleCopy}>
        <Image
          src={copied === post.prompt
            ? '/assets/icons/tick.svg'
            : '/assets/icons/copy.svg'
          }
          width={12}
          height={12}
          alt="prompt"
          className="cursor-pointer"
        />
      </div>
      </div>

      <div className="mt-8">
        <p className="mb-4 font-satoshi text-sm text-gray-700">
          {post.prompt}
        </p>
        <div className="flex justify-start items-end">
          <p className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick && handleTagClick(post.tag!)}
          >
            #{post.tag}
          </p>
      </div>

        {session?.user.id === post.creator._id && 
        pathname === '/profile' && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )}
      </div>  
    </div>
  )
}

export default PromptCard