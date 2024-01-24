import http_common_url from "@/base-url/http-common-url";
import { GetLandingPage, PostLandingPage } from "@/types/landing.types";

const getLanding = () => {
  return http_common_url.get<GetLandingPage>(`/landingpage/getAll`);
};

const postLanding = (
  companyLogo: string | null,
  resturantName: string | null,
  header: string | null,
  backgroundImage: string | null,
  termCondition: string | null,
) => {
  if (termCondition) {
    // console.log("Inside T&C");
    const data = { termCondition };
    return http_common_url.post<PostLandingPage>(`/landingpage/create`, data);
  } else {
    // console.log("Inside Else");
    const data = { resturantName, header, backgroundImage, companyLogo };
    return http_common_url.post<PostLandingPage>(`/landingpage/create`, data);
  }
};

const LandingServices = { getLanding, postLanding };
export default LandingServices;
