export function getStatusText(selectedOption) {
    switch (selectedOption) {
        case 0:
            return 'Edit';
        case 1:
            return 'Delete';
        case 2:
            return 'Status';
        default:
            return '';
    }
};


export function validateFormData(institutionForEdit) {

    if (institutionForEdit.instCode === "") {
        alert("Please enter a valid Code.");
        return false;
    }

    if (institutionForEdit.instName === "") {
        alert("Please enter a valid Name.");
        return false;
    }


    if (institutionForEdit.instStatus === "") {
        alert("Please enter a valid Status.");
        return false;
    }
    if (institutionForEdit.renewalOutputPath === "") {
        alert("Please enter a valid Status.");
        return false;
    }
    if (institutionForEdit.hsmEncPinLength === "") {
        alert("Please enter a valid hsm Enc Pin Length.");
        return false;
    }
    if (institutionForEdit.embossingOutputPath === "") {
        alert("Please enter a valid Embossing Output Path.");
        return false;
    }

    if (institutionForEdit.sessionTimeout === "") {
        alert("Please enter a valid sessionTimeout.");
        return false;
    }

    if (institutionForEdit.hsmIp === "") {
        alert("Please enter a valid hsm Ip.");
        return false;
    }

    if (institutionForEdit.customerIdLength === "") {
        alert("Please enter a valid Embossing Output Path.");
        return false;
    }

    if (institutionForEdit.accountNbLength === "") {
        alert("Please enter a valid Account Number Length.");
        return false;
    }

    if (institutionForEdit.nationalIdLength === "") {
        alert("Please enter a valid National ID Length.");
        return false;
    }

    if (institutionForEdit.daysToLockUser === "") {
        alert("Please enter a valid Days To Lock User value.");
        return false;
    }

    if (!institutionForEdit.defaultCurrencyId) {
        alert("Please enter a Default Currency ID.");
        return false;
    }

    if (!institutionForEdit.ecomOutputPath) {
        alert("Please enter an Ecommerce Output Path.");
        return false;
    }

    return true;
}
