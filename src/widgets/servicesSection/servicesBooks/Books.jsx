import { motion, AnimatePresence } from "framer-motion";
import { GoArrowUpRight } from "react-icons/go";
import "./books.scss";

const Books = ({ id, title, description, isVisible, setVisible, i }) => {
  const isOpen = isVisible === id;

  return (
    <div
      onClick={() => setVisible(isOpen ? null : id)}
      className="container services_books-enemy books-card"
    >
      <div className="container services_title_block">
        <div>
          <h3 className="services_id">{i + 1}/ </h3>
        </div>
        <div>
          <h3
            className="services_title"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>
        <div>
          <button className="services_btn">
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <GoArrowUpRight />
            </motion.div>
          </button>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="container services_block"
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: 500 }}
            exit={{ opacity: 0, maxHeight: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p className="services-text">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Books;
