import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectProductById,
  selectProductLoading,
  updateProductAsync,
} from "../../product-list/productListSlice";
import { LuTrash2 } from "../../../icons";
import { app } from "../../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Loader from "../../../components/Loader";
import { useSnackbar } from "notistack";
import ConfirmationModal from "../../../components/ConfirmationModal";

const UpdateProduct = () => {
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //selectors
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const selectedProduct = useSelector(selectProductById);
  const productLoading = useSelector(selectProductLoading);

  //states
  const [productDetails, setProductDetails] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    stock: "",
    brand: "",
    category: "",
    images: [],
  });
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductDetails({
        title: selectedProduct.title,
        description: selectedProduct.description,
        price: selectedProduct.price,
        discountPercentage: selectedProduct.discountPercentage,
        stock: selectedProduct.stock,
        brand: selectedProduct.brand,
        category: selectedProduct.category,
        rating: selectedProduct.rating,
        images: selectedProduct.images,
      });
    }
  }, [selectedProduct]);

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length < 5) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        [promises.push(storeImage(files[i]))];
      }

      Promise.all(promises)
        .then((urls) => {
          setProductDetails({
            ...productDetails,
            images: productDetails.images.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError("You can only upload 4 images(max 2mb)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only Upload 4 images");
      setUploading(false);
    }
  };

  const handleDeleteImage = (index) => {
    setProductDetails({
      ...productDetails,
      images: productDetails.images.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea" ||
      e.target.tagName === "SELECT"
    ) {
      setProductDetails({
        ...productDetails,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleEditForm = (e) => {
    e.preventDefault();
    if (productDetails.images.length < 1)
      return setError("You must Upload atleast one image");
    if (+productDetails.price < +productDetails.discountPercentage)
      return setError("Discount price must be lower than regular price");
    if (productDetails.brand === "" && productDetails.category === "") {
      return setError("Add Category and Brand for the Product");
    }
    const product = {
      ...productDetails,
      price: +productDetails.price,
      discountPercentage: +productDetails.discountPercentage,
      stock: +productDetails.stock,
    };
    product.id = params.id;
    dispatch(updateProductAsync({ update: product, alert: enqueueSnackbar }));
    setError(false);
    setProductDetails({
      title: "",
      description: "",
      price: "",
      discountPercentage: "",
      stock: "",
      brand: "",
      category: "",
      images: [],
    });
    setLoading(false);
    navigate();
  };

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product));
    setProductDetails({
      title: "",
      description: "",
      price: "",
      discountPercentage: "",
      stock: "",
      brand: "",
      category: "",
      images: [],
    });
    setShowModal(false);
    enqueueSnackbar("Product Deleted Successfully", { variant: "success" });
  };

  return (
    <>
      {productLoading ? (
        <Loader />
      ) : (
        <div className="mt-8">
          <ConfirmationModal
            title="Delete Product"
            message="Are you sure you want to delete this product?"
            dangerTag="Delete"
            cancelTag="Cancel"
            dangerAction={handleDelete}
            cancelAction={() => setShowModal(false)}
            showModal={showModal}
          />
          <h1 className="text-3xl font-primary text-center">
            {" "}
            Update Product{" "}
          </h1>

          {selectedProduct && selectedProduct.deleted && (
            <h1 className="text-red-500 text-center text-xl">
              This product has been deleted
            </h1>
          )}
          {selectedProduct && selectedProduct.stock === 0 && (
            <h1 className="text-red-500 text-center text-xl">Out of Stock</h1>
          )}
          <form
            onSubmit={handleEditForm}
            className="my-8 flex flex-col sm:flex-row gap-4"
          >
            <div className="flex-col flex gap-4 flex-1">
              <input
                id="title"
                required
                type="text"
                placeholder="Name"
                minLength="6"
                maxLength="62"
                onChange={handleChange}
                value={productDetails.title}
                className="border p-3 focus:outline-none focus:rounded-2xl transition-all focus:border-slate-500 duration-700 rounded-lg"
              />
              <textarea
                id="description"
                required
                type="text"
                placeholder="Description"
                onChange={handleChange}
                value={productDetails.description}
                className="border p-3 focus:outline-none focus:rounded-2xl transition-all focus:border-slate-500 duration-700 rounded-lg"
              />
              <input
                id="price"
                type="number"
                placeholder="Price"
                min={20}
                max={1000}
                required
                onChange={handleChange}
                value={productDetails.price}
                className="border p-3 focus:outline-none focus:rounded-2xl transition-all focus:border-slate-500 duration-700 rounded-lg"
              />
              <input
                id="discountPercentage"
                type="number"
                placeholder="Discounted Percentage"
                required
                min={10}
                max={100}
                onChange={handleChange}
                value={productDetails.discountPercentage}
                className="border p-3 focus:outline-none focus:rounded-2xl transition-all focus:border-slate-500 duration-700 rounded-lg"
              />
              <input
                id="stock"
                type="number"
                placeholder="Product Stock"
                max={20}
                required
                onChange={handleChange}
                value={productDetails.stock}
                className="border p-3 focus:outline-none focus:rounded-2xl transition-all focus:border-slate-500 duration-700 rounded-lg"
              />
              <select
                id="category"
                value={productDetails.category}
                onChange={handleChange}
                className="border p-3 focus:outline-none focus:rounded-2xl transition-all focus:border-slate-500 duration-700 rounded-lg"
              >
                <option value="">--select category--</option>
                {categories &&
                  categories.map((category, index) => (
                    <option key={index} value={category.value}>
                      {category.label}
                    </option>
                  ))}
              </select>
              <select
                id="brand"
                value={productDetails.brand}
                onChange={handleChange}
                className="border p-3 focus:outline-none focus:rounded-2xl transition-all focus:border-slate-500 duration-700 rounded-lg"
              >
                <option value="">--select brand--</option>
                {brands &&
                  brands.map((brand, index) => (
                    <option key={index} value={brand.value}>
                      {brand.label}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex flex-col flex-1 gap-4">
              <p className="font-semibold">
                Images:
                <span className="font-normal text-gray-700">
                  The first image will be the cover (max 4)
                </span>
              </p>
              <div className="flex gap-4 flex-col md:flex-row">
                <input
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  className="border p-3 focus:outline-none focus:rounded-2xl transition-all focus:border-slate-500 duration-700 rounded-lg cursor-pointer"
                />
                <button
                  type="button"
                  disabled={uploading}
                  className="bg-slate-700 rounded-lg text-white uppercase hover:opacity-95 p-3 disabled:opacity-80 transition-all duration-500"
                  onClick={handleImageSubmit}
                >
                  {uploading ? <Loader /> : "upload"}
                </button>
              </div>
              <p className="text-sm text-red-700">
                {imageUploadError && imageUploadError}
              </p>
              {productDetails.images.length > 0 &&
                productDetails.images.map((url, index) => (
                  <div
                    className="flex justify-between p-2 border items-center"
                    key={url}
                  >
                    <img
                      src={url}
                      alt="listingImages"
                      className="rounded-lg object-contain w-20 h-20"
                    />
                    <LuTrash2
                      className="hover:opacity-95 cursor-pointer mx-2"
                      onClick={() => handleDeleteImage(index)}
                    />
                  </div>
                ))}
              <button
                disabled={loading || uploading}
                className="bg-pink-500 rounded-lg text-white uppercase hover:opacity-95 p-3 disabled:opacity-80 transition-all duration-500"
              >
                {loading ? <Loader /> : "Update Product "}
              </button>
              {selectedProduct && !selectedProduct.deleted && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(true);
                  }}
                  disabled={loading || uploading}
                  className="bg-pink-500 rounded-lg text-white uppercase hover:opacity-95 p-3 disabled:opacity-80 transition-all duration-500"
                >
                  Delete Product
                </button>
              )}

              {error && <p className="text-sm text-red-700"> {error} </p>}
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateProduct;
