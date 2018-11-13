import gql from "graphql-tag";

export const GET_SONAR_CUSTOMERS = gql`{
    sonarCustomers(domain: "tekwav", username: "datasync", password: "Datasync!123") {
        Id
        FirstName
        LastName
        Username
        BalanceTotal
        AddressLine1
        AddressLine2
        City
        State
        EmailAddress
        MobilePhone
        WorkPhone
        HomePhone
        Fax
    }
}
`;