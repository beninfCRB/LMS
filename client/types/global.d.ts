type onboardingSwipperDataType = {
    id: number;
    title: string;
    description: string;
    sortDescription: string;
    sortDescription2?: string;
    image: any;
}

type User = {
    _id: string;
    name: string;
    email: string;
    password?: string;
    avatar?:{
      url:string
    };
    courses: any;
  createdAt: Date;
  updatedAt: Date;
  };

  type BannerDataTypes = {
    bannerImageUrl: any;
  };
  