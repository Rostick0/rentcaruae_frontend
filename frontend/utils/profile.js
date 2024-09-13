import useImage from "~/composables/useImage";

export const getProfileOnSubmitValues = async ({
  balance,
  free_leads,
  image,
  license,
  sertificate,
  company_schedules,
  ...values
}) => {
  const { getFileFrom } = useFile();
  const { getImageFrom } = useImage();

  const data = {
    ...values,
    company_schedules: {
      start: [],
      end: [],
      is_show: company_schedules?.is_show,
    },
  };

  data.user.tel = convertPhoneToDb(data?.user?.tel);
  data.company.city_id = data?.company?.city_id?.id;

  const image_id = await getImageFrom(image).then((res) => res?.id);
  const license_id = await getFileFrom(license).then((res) => res?.id);
  const sertificate_id = await getFileFrom(sertificate).then((res) => res?.id);

  company_schedules?.period?.forEach?.((item) => {
    const [start, end] = convertTimeToDb(item);

    data.company_schedules.start.push(start);
    data.company_schedules.end.push(end);
  });

  return {
    ...data,
    balance: removeSpaces(balance),
    free_leads: removeSpaces(free_leads),
    image: image_id,
    license: license_id,
    sertificate: sertificate_id,
  };
};
