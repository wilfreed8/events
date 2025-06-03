

const loading = (props: { type: string; taille: string; color: string }) => {
  return (
    <div>
      <span
        className={`loading loading-${props.type} loading-${props.taille}  text-${props.color}`}
      ></span>
    </div>
  );
};

export default loading;
