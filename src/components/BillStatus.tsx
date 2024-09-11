const BillStatus = ({status}:{status:string}) => {
  let statusColor = 'bg-[#E0E0E0] text-[#757575]';
  let statusName = status;
  if(status === 'ACTION_REQUIRED'){
    statusColor = 'bg-[#FFF2E7] text-[#FB8110]';
    statusName = 'ACTION_REQUIRED';
  }else if(status === 'APPROVED'){
    statusColor = 'bg-[#E6F4FB] text-[#0092D6]';
  }
    return (
      <div
        className="flex items-center"
      >
        <span className={`text-xs text-center font-semibold uppercase p-1 md:pl-2 md:pr-2 md:text-xs lg:p-1 lg:pl-2 lg:pr-2 rounded-md ${statusColor}`}>{statusName}</span>
      </div>
    );
};

export default BillStatus;
