import { Link } from 'react-router-dom';
import FormMode from '../../helper/formHelper';

function FormButtons(props) {

    const submitButtonLabel = props.formMode === FormMode.NEW ? 'Add' : 'Edit'

    return (
        <div className="form-buttons">
            <p id="errorsSummary" className="errors-text">{props.error}</p>
            <input className="button submit" type="submit" value={submitButtonLabel} />
            <Link to={props.cancelPath} className="button cancel">Cancel</Link>
        </div>
    )
}

export default FormButtons