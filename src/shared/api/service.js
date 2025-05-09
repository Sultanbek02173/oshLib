// import axios from "./Axios";
import instance from "./Axios";

class StoreService {
  getAllCategories() {
    return instance.get("/categories");
  }
  async getProjectDetail(id) {
    const response = await instance.get(`/project/main-projects/${id}/`); // Updated endpoint
    return response.data;
  }
  async getProjectData() {

    const response = await instance.get("/project/main-projects/");
    return response.data;

  }

  async getReaderData() {
    const response = await instance.get("banner/Graphic_work/banner/");
    return response.data;
  }

  async getSupportData() {
    const response = await instance.get("/supports/library-support/");
    return response.data;
  }

  async getLibraryValues() {
    const response = await instance.get("/supports/library-values/");
    return response.data;
  }

  async getBookElectronicData() {
    const response = await instance.get("/news/book-arrivals/");
    return response.data;
  }

  async getPartnersData() {
    const response = await instance.get("/base/partners/");
    return response.data;
  }

  async getPayType() {
    const response = await instance.get("/supports/paytype/");
    return response.data;
  }
  async getNewsData() {
    const response = await instance.get("/news/book-arrivals/");
    return response.data;
  }

  async getServicesData() {
    const response = await instance.get("/catalog/");
    return response.data;
  }
  async getServicesBannerData() {
    const response = await instance.get("/services/header/");
    return response.data;
  }

  async getAboutData() {
    const response = await instance.get("/about_library/about-library/");
    return response.data;
  }

  async getManagementData() {
    const response = await instance.get("/about_library/management/");
    return response.data;
  }

  async getStructureData() {
    const response = await instance.get(
      "/about_library/structure-and-libraries/"
    );
    return response.data;
  }

  async getActivitiesData() {
    const response = await instance.get("/about_library/acts/");
    return response.data;
  }

  async getHistoryData() {
    const response = await instance.get("/about_library/history/");
    return response.data;
  }

  async getAboutTitlesData() {
    const response = await instance.get("/about_library/titles-library/");
    return response.data;
  }
  async getfetcProData() {
    const response = await instance.get("/pro_activity/type_activity/");
    return response;
  }

  async getfetctypeData() {
    const response = await instance.get("/pro_activity/ativity/");
    return response;
  }
}

export default new StoreService();
// getfetcProData
// getfetctypeData
