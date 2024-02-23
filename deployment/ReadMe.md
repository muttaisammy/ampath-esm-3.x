# Add Appointment Service in 
insert into amrs.appointment_service  select * from openmrs.appointment_service


SELECT * FROM openmrs.metadatamapping_metadata_term_mapping;
-- update amrs.patient_identifier_type -- set creator=1 where creator >0

insert into metadatamapping_metadata_source(name,description,creator,date_created,uuid) 
values('org.openmrs.module.emrapi','Source used to tag metadata used in the EMR API module',1,now(),uuid());

-- org.openmrs.module.emrapi | Source used to tag metadata used in the EMR API module |    2 |     2 | 2021-05-17 11:02:58 | 2023-07-28 07:42:25 |    0 | NULL     |    NULL | NULL     | 33bed25b-2ff7-49ec-ba52-bd066199d8b8

insert into amrs.metadatamapping_metadata_term_mapping  (metadata_source_id,code ,metadata_class,metadata_uuid,creator,date_created, uuid) 
values(1,'emr.primaryIdentifierType','org.openmrs.PatientIdentifierType','58a4732e-1359-11df-a1f1-0026b9348838',1,now(),uuid())

-- 1 |         1 | emr.primaryIdentifierType        | org.openmrs.PatientIdentifierType       | 05a29f94-c0ed-11e2-94be-8c13b969e334 | NULL | NULL    |    2 | 2021-05-25 13:35:28 |     2 | 2022-10-28 11:44:04 |    0 | NULL     |    NULL | NULL     | b7c8adf5-c875-4e78-bb4b-fea391b1de55

# Tomcat Logs
sudo service tomcat restart && tail -f /opt/tomcat/latest/logs/* /opt/tomcat/.OpenMRS/amrs/openmrs.log

# Restore concepts from parent and map child
update  amrs.concept set creator=1 ,changed_by =1 ;
update  amrs.concept_name set creator=1 ,changed_by =1 ;
update  amrs.concept_description set creator=1 ,changed_by =1 ;
update  amrs.concept_set set creator=1;
update amrs.concept_name_tag set creator=1 ,changed_by =1 ;
update amrs.concept_stop_word set creator=1 ,changed_by =1 ;
update amrs.concept_state_conversion set creator=1 ,changed_by =1 ;
update amrs.concept_reference_term_map set creator=1 ,changed_by =1 ;
update amrs.concept_reference_term set creator=1 ,changed_by =1 ;
update amrs.concept_reference_source set creator=1 ,changed_by =1 ;
update amrs.concept_reference_map set creator=1 ,changed_by =1 ;
update amrs.concept_proposal_tag_map set creator=1 ,changed_by =1 ;
update amrs.concept_proposal  set creator=1 ,changed_by =1 ;
update amrs.concept_numeric set creator=1 ,changed_by =1 ;
update amrs.concept_name_tag_map set creator=1 ,changed_by =1 ;
update amrs.concept_name_tag set creator=1 ,changed_by =1 ;
update amrs.concept_name set creator=1 ,changed_by =1 ;
update amrs.concept_map_type set creator=1 ,changed_by =1 ;
update amrs.concept_description set creator=1 ,changed_by =1 ;
update amrs.concept_datatype set creator=1 ,changed_by =1 ;
update amrs.concept_complex set creator=1 ,changed_by =1 ;
update amrs.concept_class set creator=1 ,changed_by =1 ;
update amrs.concept_attribute_type set creator=1 ,changed_by =1 ;
update amrs.concept_attribute set creator=1 ,changed_by =1 ;
update amrs.concept_answer set creator=1 ,changed_by =1 ;
update amrs.concept set creator=1 ,changed_by =1 ;

# Sort drugs dispensing FHIR saving (Sorts Pharm Dispensing)
create a dir named fhirconceptsources in configaration next to modules
copy in the fhir_concept_sources-core_data.csv file.
restart tomcat service
select * from amrs.fhir_concept_source -- confirm if present
Delete from configurations_checksum the restart the server

set foreign_key_checks=0;
truncate amrs.fhir_concept_source;
truncate amrs.concept_reference_source;
set foreign_key_checks=1;

edit concept competed mapping to HL_7_medication_dispense_status_source -- concept 1267
add mapping same as soucre Hl_

# #################
It's a must to have a concept called 
Service 
Status




