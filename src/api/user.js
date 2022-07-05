import request from "@/utils/request";
export const goLogin = (data) =>
  request({
    url: "/v1_0/authorizations",
    method: "POST",
    data,
  });
export const goSmsCode = (mobile) => {
  return request({
    method: "GET",
    url: `/v1_0/sms/codes/${mobile}`,
  });
};
