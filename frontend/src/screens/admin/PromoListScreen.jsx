import { LinkContainer } from "react-router-bootstrap";
import { Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Paginate from "../../components/Paginate";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetPromosQuery,
  useCreatePromoMutation,
  useDeletePromoMutation,
} from "../../slices/promosApiSlice";
import Button from "@mui/joy/Button";
import Table from "@mui/joy/Table";
import { toast } from "react-toastify";

const PromoListScreen = () => {
  const { data: promos, isLoading, error, refetch } = useGetPromosQuery();

  const [createPromo, { isLoading: loadingCreate }] = useCreatePromoMutation();

  const [deletePromo, { isLoading: loadingDelete }] = useDeletePromoMutation();

  const createPromoHandler = async () => {
    if (window.confirm("You are going to create a new promo")) {
      try {
        await createPromo();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deletePromo(id);
        toast.success("Product deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  console.log(promos);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Promos</h1>
        </Col>
        <Col className="text-end">
          <Button className="m-3" onClick={createPromoHandler}>
            <FaEdit />
            Create a promo
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table hoverRow>
          <thead>
            <tr>
              <th>ID</th>
              <th>TITLE</th>
              <th>DISCOUNT</th>
              <th>FREE SHIPPING</th>
              <th>PRODUCTS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {promos.map((promo) => (
              <tr key={promo._id}>
                <td>{promo._id}</td>
                <td
                  dangerouslySetInnerHTML={{
                    __html: promo.title,
                  }}
                />
                <td>{promo.discount}</td>
                <td>
                  {promo.freeShipping ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {/* Loop through the products and display their names and prices */}
                  {promo.products && promo.products.length > 0 ? (
                    <ul>
                      {promo.products.map((product) => (
                        <li key={product._id}>
                          {product.name} - ${product.price}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>No products</span>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/promo/${promo._id}/edit`}>
                    <Button variant="soft" className="mx-2">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    color="danger"
                    onClick={() => deleteHandler(promo._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default PromoListScreen;
