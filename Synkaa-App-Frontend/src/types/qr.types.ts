export interface PostQrData {
  success: boolean;
  message: string;
  scaling: number;
  createdAt: string;
  qrName: string;
  chatbotId: string;
  qrcodeNumber: string;
  status: boolean;
  data: {
    id: number;
  };
}

export interface GetAllQrData {
  success: boolean;
  message: string;
  data: [
    {
      id: number;
      scaling: number;
      createdAt: string;
      qrName: string;
      chatbotId: string;
      qrcodeNumber: string;
      status: boolean;
    },
  ];
}

export interface GetQrData {
  _id: string;
  scaling: number;
  createdAt: string;
  qrName: string;
  chatbotId: string;
  qrcodeNumber: string;
  status: boolean;
}

export interface GetQrDetail {
  success: boolean;
  message: string;
  data: {
    id: number;
    scaling: number;
    createdAt: string;
    qrName: string;
    chatbotId: string;
    qrcodeNumber: string;
    status: boolean;
  };
}

export interface UpdateQrData {
  success: boolean;
  message: string;
}

export interface DeleteQrData {
  success: boolean;
  message: string;
}
