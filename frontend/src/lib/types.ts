export interface EditableRef {
  cancel: () => void;
}

export type StrapiErrorT = {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
  };
};

export type StrapiLoginResponseT = {
  jwt: string;
  user: any;
};

export type PartialWithRequired<T, K extends keyof T> = Partial<Omit<T, K>> &
  Pick<T, K>;
