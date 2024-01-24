import http_common_url from "@/base-url/http-common-url";
import {
  GetAllQrData,
  PostQrData,
  UpdateQrData,
  DeleteQrData,
  GetQrDetail,
} from "@/types/qr.types";

const getAllQr = (limit: number, pageNo: number) => {
  return http_common_url.get<GetAllQrData>(`/qrcode/getAll?limit=${limit}&pageNo=${pageNo}`);
};

const getQrDetail = (id: string) => {
  return http_common_url.get<GetQrDetail>(`/qrcode?id=${id}`);
};

const postQr = (qrName: string, qrSize: number, qrId: string, selectedChatbot: string) => {
  const data = {
    qrName,
    status: true,
    qrcodeNumber: qrId,
    scaling: qrSize,
    chatbotId: selectedChatbot,
  };
  return http_common_url.post<PostQrData>(`/qrcode/create`, data);
};

const updateQr = (
  qrName: string,
  chatbotId: string,
  scaling: number,
  qrcodeNumber: string,
  qrId: string,
  status: boolean,
) => {
  const data = {
    scaling,
    qrName,
    chatbotId,
    qrcodeNumber,
    status,
  };
  return http_common_url.put<UpdateQrData>(`/qrcode/update?id=${qrId}`, data);
};

const deleteQr = (qrId: string) => {
  return http_common_url.delete<DeleteQrData>(`/qrcode/delete?id=${qrId}`);
};

const QrTableServices = { getAllQr, getQrDetail, postQr, updateQr, deleteQr };

export default QrTableServices;
