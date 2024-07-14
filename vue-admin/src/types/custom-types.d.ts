// 声明.vue文件
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<object, object, any>;
  export default component;
}

export interface IBasicResponse<T> {
  error_code: string;
  message: string;
  data: T;
  success: boolean;
}

export interface IPaging {
  page_no: number;
  page_size: number;
  total: number;
}
export interface IPagingResponse<T> extends IBasicResponse<T> {
  data: {
    paging: IPaging;
    data: T[];
  };
}
