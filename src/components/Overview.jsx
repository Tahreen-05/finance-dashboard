import React from 'react';
import SummaryCards from './SummaryCards';
import Charts from './Charts';
const Overview = () => {
    return (
        <div className='space-y-6'>
            <SummaryCards />
            <Charts />
        </div>
    );
};
export default Overview;