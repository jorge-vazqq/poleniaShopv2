import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "@mui/joy/Button";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Select from 'react-select';
import FormContainer from "../../components/FormContainer";
import {
  useUpdatePromoMutation,
  useGetPromoDetailsQuery,
  useUploadPromoImageMutation,
} from "../../slices/promosApiSlice";
import { useGetProductsQuery } from "../../slices/productsApiSlice"; // Import the products query

const PromoEditScreen = () => {
  const { id: promoId } = useParams();

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [discount, setDiscount] = useState(0);
  const [freeShipping, setFreeShipping] = useState(false);
  const [description, setDescription] = useState("");

  const { data: promo, isLoading, refetch, error } = useGetPromoDetailsQuery(promoId);

  const [updatePromo, { isLoading: laodingUpdate }] = useUpdatePromoMutation();

  const [uploadPromoImage, { isLoading: loadingUpload }] =
    useUploadPromoImageMutation();

  const navigate = useNavigate();

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsQuery({}); // Fetch all products

  const [selectedProductIds, setSelectedProductIds] = useState([]);

  useEffect(() => {
    if (promo) {
      setImage(promo.image);
      setTitle(promo.title);
      setDiscount(promo.discount);
      setFreeShipping(promo.freeShipping);
      setDescription(promo.description);
      setSelectedProductIds(promo.products || []);
    }
  }, [promo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedPromo = {
      promoId,
      image,
      title,
      discount,
      freeShipping,
      description,
      products: selectedProductIds, // Use the selected product IDs
    };

    const result = await updatePromo(updatedPromo);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Promo updated");
      refetch();
      navigate("/admin/promolist");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadPromoImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <>
      <FormContainer>
        <h1>Edit Promos</h1>
        {laodingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="image" className="my-2">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type="file"
                label="Choose file"
                onChange={uploadFileHandler}
              ></Form.Control>
            </Form.Group>
            {loadingUpload && <Loader />}

            <Form.Group controlId="title" className="my-2">
              <Form.Label>title</Form.Label>

              <ReactQuill
                theme="snow"
                value={title}
                onChange={setTitle}
                className="custom-quill"
                style={{
                  backgroundColor: "white",
                  color: "black",
                }}
              />
            </Form.Group>

            <Form.Group controlId="discount" className="my-2">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter discount"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="freeShipping" className="my-2">
              <Form.Check
                type="checkbox"
                label="Free Shipping"
                checked={freeShipping}
                onChange={(e) => setFreeShipping(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId="description" className="my-2">
              <Form.Label>Description</Form.Label>

              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                className="custom-quill"
                style={{
                  backgroundColor: "white",
                  color: "black",
                }}
              />
            </Form.Group>

            <Form.Group controlId="products" className="my-2">
              <Form.Label>Products</Form.Label>
              {productsLoading ? (
                <Loader />
              ) : productsError ? (
                <Message variant="danger">{productsError}</Message>
              ) : (
                <Select
                  isMulti // Allow multiple selections
                  options={products.products.map((product) => ({
                    value: product._id,
                    label: product.name,
                  }))}
                  value={selectedProductIds.map((id) => ({
                    value: id,
                    label:
                      products.products.find((p) => p._id === id)?.name || "",
                  }))}
                  onChange={(selectedOptions) => {
                    setSelectedProductIds(
                      selectedOptions.map((option) => option.value)
                    );
                  }}
                />
              )}
            </Form.Group>

            <Button type="submit" className="my-2">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default PromoEditScreen;
