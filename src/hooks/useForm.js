import { useMemo } from "react";
import { useEffect, useState } from "react";

export const useForm = ( initialForm = {}, formValidations = {} ) => {

    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation ] = useState({});

    useEffect(() => {
        setFormState( initialForm );
    }, [ initialForm ])

    useEffect(() => {
        createValidators();
    }, [ formState])
    
    const isFormValid = useMemo( () => {

        for( const formvalue of Object.keys( formValidation )){
            if ( formValidation[formvalue] !== null) return false;
        }

        return true;
    }, [formValidation])

    const handleInputChage = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const handleResetForm = () =>{
        setFormState( initialForm )
    }

    const createValidators = () => {

        const formCheckedValues = {};
        for (const formField of Object.keys( formValidations )) {
            const [ fn, errorMessage = 'Este campo es requerido' ] = formValidations[formField];
            formCheckedValues[`${formField}Valid`] = fn( formState[formField] ) ? null: errorMessage;
            setFormValidation( formCheckedValues );
        }

    }

    return {
        ...formState,
        ...formValidation,
        formState,
        isFormValid,
        handleInputChage,
        handleResetForm,
    }
}