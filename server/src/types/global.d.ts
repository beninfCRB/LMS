export interface IRegistrationBody {
    name: string;
    email: string;
    password: string;
  }

export interface IActivationToken {
    token: string;
    activationCode: string;
  }

export interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}

export interface IActivationUser {
  user: IUser; 
  activationCode: string;
}

export interface IUpdateProfilePicture {
  avatar: string;
}