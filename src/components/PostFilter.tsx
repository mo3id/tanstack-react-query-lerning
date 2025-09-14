import { Form } from "react-bootstrap";
import { PostFilterProps, PostStatusType } from "../types";

const PostFilter = ({
  selectedPostStatus,
  setselectedPostStatus,
}: PostFilterProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setselectedPostStatus(e.target.value as PostStatusType);
  };
  return (
    <>
      <h5>Filter By Status</h5>
      <Form.Select value={selectedPostStatus} onChange={onChangeHandler}>
        <option value="all">Select Status</option>
        <option value="publish">Publish</option>
        <option value="draft">Draft</option>
        <option value="block">Block</option>
      </Form.Select>
    </>
  );
};

export default PostFilter;
