export type APIError = {
  reason: string;
};

export type UserDataDTO = {
    id: number;
    avatar: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    email: string;
    phone: string;
};

export type CardDTO = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: LastMessageDTO;
};

export type LastMessageDTO = {
  user: UserDataDTO;
  time: Date;
  content: string;
};

// {"id":1,"user_id":4614,"chat_id":81,"type":"message","time":"2022-07-03T06:13:19+00:00","content":"some test message","is_read":true,"file":null
export type ChatMessageDTO = {
  id: number;
  user_id: number;
  chat_id: number;
  time: Date;
  content: string;
  is_read: boolean;
};

export type ChangePasswordDataDTO = {
  oldPassword: string;
  newPassword: string;
};
