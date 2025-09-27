// import ClipLoader from 'react-spinners/ClipLoader';
// import BounceLoader from 'react-spinners/BounceLoader';

import GridLoader from 'react-spinners/GridLoader';
  


const Spinner = ({ loading })  => {
  return (
    <div className="flex items-center justify-center h-screen">
      <GridLoader color="#386077" loading={loading} size={10} />
    </div>
  );
};

export default Spinner;
