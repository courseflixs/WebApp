export interface adminLogin {
  email: String;
  password: String;
}

export interface Category {
  categoryType: String,
  categoryName: String
}
export interface Product {
  proMainImg: String,
  proName: String,
  catName: String,
  proFileSize: String,
  proOriginalPrice: String,
  proSalePrice: String,
  selePageLink: String,
  salePage: String,
  gifImage: String,
  sliderProVisiblity: String,
  recomProvisiblity: String,
  seoKeywordList: String,

}
export interface Blog {
  blogName: String,
  blogCategory: String,
  blogDesc: String,
  blogTags: String,

}