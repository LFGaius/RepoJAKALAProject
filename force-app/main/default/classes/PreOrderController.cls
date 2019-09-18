public with sharing class PreOrderController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getOrderingCustomer() {
        List<Account> accountList=[SELECT Id,ParentId,Name FROM Account LIMIT 100];

        return accountList;
    }

    @AuraEnabled(cacheable=true)
    public static List<Customer_Channel__c> getCustomerChanner() {
        return new List<Customer_Channel__c>();
    }

    @AuraEnabled(cacheable=true)
    public static Account getNameById(String id) {
        Account acc=[SELECT Name FROM Account WHERE Id=:id];
        return acc;
    }
}
