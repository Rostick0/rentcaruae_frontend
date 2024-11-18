import api from "~/api";

export default () => {
  const createFile = async (file) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.file.create({
      data: formData,
    });

    return await response.data;
  };

  const createFiles = async (files) => {
    let data = [];

    for (let i = 0; i < files.length; i++) {
      if (files[i]?.file) {
        try {
          const file = await createFile(files[i]?.file);
          data.push(file.id);
        } catch (e) {
          warningPopup(`File dont upload: ${files[i]?.name}`);
        }
      }
    }

    return data;
  };

  const getFileFrom = async (file) => {
    if (file?.toString() === "[object File]") {
      const resp = await createFile(file);

      if (resp?.error) {
        warningPopup("File dont upload");
        return;
      }

      return await resp;
    }
    return file;
  };

  const getFileIdsFrom = async (files) => {
    const newIds = await createFiles(files);
    const idsOld = files?.filter?.((i) => !i?.file)?.map((item) => item?.id);

    return [...idsOld, ...newIds].join();
  };

  return {
    createFile,
    createFiles,
    getFileFrom,
    getFileIdsFrom,
  };
};
