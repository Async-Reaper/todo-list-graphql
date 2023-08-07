import React, {useCallback, useContext, useEffect, useState} from "react";
import {Button, Input, Space} from "antd";
import {useMutation} from "@apollo/client";
import {ICreatePost} from "../../model/types";
import {CREATE_POST} from "../../model/query/createPostQuery";
import {PopupContext} from "@app/providers/ContextProvider/PopupContext";

interface Props {
   onClose: () => void;
}

const Component = ({onClose}: Props) => {
   const [title, setTitle] = useState<string>("");
   const [body, setBody] = useState<string>("");
   const [isDisabled, setIsDisabled] = useState<boolean>(true);
   const [newPost] = useMutation(CREATE_POST);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const {setIsCreatePost} = useContext(PopupContext);

   const dataCreateUser: ICreatePost = {
      title,
      body
   };

   const onCreatePost = useCallback(() => {
      setIsLoading(true);
      newPost({
         variables: {
            input: dataCreateUser
         }
      }).then(() => {
         setIsCreatePost(true);
         setIsLoading(false);
         setTitle("");
         setBody("");
         setIsDisabled(true);
         onClose();
      }).catch((e) => {
         setIsLoading(false);
         console.log(e);
      });
   }, [dataCreateUser, setTitle, setBody, setIsDisabled, setIsLoading, newPost]);

   useEffect(() => {
      if (title === "" || body === "") {
         setIsDisabled(true);
      } else {
         setIsDisabled(false);
      }
   }, [title, body, setIsDisabled]);

   return (
      <Space direction="vertical">
         <Input
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
         />
         <Input
            placeholder="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
         />
         <Button loading={isLoading} disabled={isDisabled} onClick={onCreatePost}>Create post</Button>
      </Space>
   );
};

export const CreatePostForm = React.memo(Component);
