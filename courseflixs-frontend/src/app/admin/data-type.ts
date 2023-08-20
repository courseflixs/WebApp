export interface adminLogin {
  email: String;
  password: String;
}

export interface Category {
  categoryType: String,
  categoryName: String,
  qoute:String
}
export interface Product {
  _id:String,
  main_product_image: String,
  product_name: String,
  category_name: String,
  file_size: String,
  original_price: Number,
  sale_price: Number,
  sale_page_link: String,
  sale_page: String,
  gif_image: String,
  show_slider: String,
  recommended: String,
  tags: String,

}
export interface Blog {
  blogName: String,
  blogCategory: String,
  blogDesc: String,
  blogTags: String,

}