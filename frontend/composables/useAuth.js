import auth from "~/api/modules/auth";

export default async () => {
  const extnedsUser =
    "company.company_schedules,company.city,company.license.file,company.sertificate.file,company.image.image,refresh_car";

  const accessToken = useCookie("accessToken", {
    maxAge: 60 * 60 * 24 * 7,
  });
  const user = useState("user", () => null);

  const setUser = (resp) => {
    user.value = resp?.data?.user;
    accessToken.value = resp?.data?.access_token;
  };

  const login = async (data, isRedirect = true) => {
    try {
      const resp = await auth.login({ ...data, extends: extnedsUser });

      if (resp?.error) return resp?.errorResponse?.data;

      setUser(resp);

      if (isRedirect) navigateTo("/seller");
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (data, isRedirect = true) => {
    try {
      const resp = await auth.register(data);

      if (resp?.error) return resp?.errorResponse?.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async () => {
    try {
      const res = await auth.me(
        {
          extends: extnedsUser,
        },
        { Authorization: `Bearer ${accessToken.value}` }
      );

      if (res?.error) return;

      user.value = await res?.data;
      // .then((resp) => {
      //   if (!resp?.error && resp) {
      //     user.value = resp?.data;
      //   }
      // });
    } catch (error) {
      // console.error(error);
    }
  };

  const logout = (
    params
    // options?: NavigateToOptions | undefined
  ) => {
    accessToken.value = null;
    user.value = null;
    if (params) {
      navigateTo(params);
    } else {
      navigateTo("/");
    }
  };

  // if (accessToken.value && !user.value) {
  //   await getUser();
  // }
  return {
    accessToken,
    user,
    login,
    register,
    getUser,
    logout,
  };
};
