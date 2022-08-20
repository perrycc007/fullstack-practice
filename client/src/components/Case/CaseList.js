import CaseItem from './CaseItem';
import classes from './CaseList.module.css';
import Pagination from '../Pagination/Pagination';
import {useState} from 'react';

let PageSize = 2;
// onPageChange;
// currentPage;



function CaseList(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const caseItems = props.cases
  const totalCases = props.count
  const functionHandler = (currentPage,PageSize) => {
    const skip = currentPage ** PageSize 
    props.passSkipData(skip);
    }
    functionHandler(currentPage,PageSize)
  return (
    <div>
    <ul className={classes.list}>
      {caseItems.map((caseItem) => (
        <CaseItem
          key={caseItem.id}
          id={caseItem.id}
          title={caseItem.title}
          content={caseItem.content}
        />
        
      ))}
    </ul>
    <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={totalCases||5}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}      
    />
    </div>
  );
}

export default CaseList;
