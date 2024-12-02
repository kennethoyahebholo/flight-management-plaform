const truncateData = (data: string, count: number) => {
  return data?.length > count ? `${data?.substring(0, count)}...` : data;
};

export default truncateData;
