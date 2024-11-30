const truncateData = (data: any, count?: any) => {
  return data?.length > count ? `${data?.substring(0, count)}...` : data;
};

export default truncateData;
