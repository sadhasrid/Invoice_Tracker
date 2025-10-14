export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      aaa_form_drafts: {
        Row: {
          appraiser_names: Json
          created_at: string
          draft_name: string
          enhanced_calculations: Json
          form_data: Json
          id: string
          measurement_data: Json
          org_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          appraiser_names?: Json
          created_at?: string
          draft_name: string
          enhanced_calculations?: Json
          form_data?: Json
          id?: string
          measurement_data?: Json
          org_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          appraiser_names?: Json
          created_at?: string
          draft_name?: string
          enhanced_calculations?: Json
          form_data?: Json
          id?: string
          measurement_data?: Json
          org_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "aaa_form_drafts_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_aaa_form_drafts_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      active_user_sessions: {
        Row: {
          created_at: string | null
          id: string
          last_activity: string | null
          login_time: string | null
          org_id: string | null
          session_token: string
          updated_at: string | null
          user_id: string
          username: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_activity?: string | null
          login_time?: string | null
          org_id?: string | null
          session_token: string
          updated_at?: string | null
          user_id: string
          username: string
        }
        Update: {
          created_at?: string | null
          id?: string
          last_activity?: string | null
          login_time?: string | null
          org_id?: string | null
          session_token?: string
          updated_at?: string | null
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "active_user_sessions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "active_user_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_active_user_sessions_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      app_users: {
        Row: {
          created_at: string | null
          department: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          org_id: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          org_id?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          org_id?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_app_users_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      approval_requests: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          approved_by_user_role_id: string | null
          archived_at: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          org_id: string | null
          parent_approval_id: string | null
          purchase_request_id: string
          rejected_at: string | null
          rejected_by: string | null
          rejected_by_user_role_id: string | null
          rejection_reason: string | null
          requested_at: string | null
          status: string
          updated_at: string | null
          version: number | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          approved_by_user_role_id?: string | null
          archived_at?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          org_id?: string | null
          parent_approval_id?: string | null
          purchase_request_id: string
          rejected_at?: string | null
          rejected_by?: string | null
          rejected_by_user_role_id?: string | null
          rejection_reason?: string | null
          requested_at?: string | null
          status?: string
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          approved_by_user_role_id?: string | null
          archived_at?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          org_id?: string | null
          parent_approval_id?: string | null
          purchase_request_id?: string
          rejected_at?: string | null
          rejected_by?: string | null
          rejected_by_user_role_id?: string | null
          rejection_reason?: string | null
          requested_at?: string | null
          status?: string
          updated_at?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "approval_requests_approved_by_user_role_id_fkey"
            columns: ["approved_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approval_requests_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approval_requests_purchase_request_id_fkey"
            columns: ["purchase_request_id"]
            isOneToOne: false
            referencedRelation: "purchase_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approval_requests_rejected_by_user_role_id_fkey"
            columns: ["rejected_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_approval_requests_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_parent_approval"
            columns: ["parent_approval_id"]
            isOneToOne: false
            referencedRelation: "approval_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      approval_transactions: {
        Row: {
          action_type: string
          approval_request_id: string | null
          created_at: string
          details: Json | null
          id: string
          metadata: Json | null
          org_id: string | null
          performed_by: string | null
          performed_by_name: string | null
          performed_by_user_role_id: string | null
          purchase_request_id: string
          timestamp: string
          transaction_id: string
        }
        Insert: {
          action_type: string
          approval_request_id?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          metadata?: Json | null
          org_id?: string | null
          performed_by?: string | null
          performed_by_name?: string | null
          performed_by_user_role_id?: string | null
          purchase_request_id: string
          timestamp?: string
          transaction_id?: string
        }
        Update: {
          action_type?: string
          approval_request_id?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          metadata?: Json | null
          org_id?: string | null
          performed_by?: string | null
          performed_by_name?: string | null
          performed_by_user_role_id?: string | null
          purchase_request_id?: string
          timestamp?: string
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "approval_transactions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approval_transactions_performed_by_user_role_id_fkey"
            columns: ["performed_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_approval_transactions_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      approved_gauge_ids: {
        Row: {
          approved_at: string
          created_at: string
          final_gauge_id: string
          grn_id: string
          id: string
          item_description: string | null
          org_id: string | null
          original_gauge_id: string
          serial_number: string
          updated_at: string
        }
        Insert: {
          approved_at?: string
          created_at?: string
          final_gauge_id: string
          grn_id: string
          id?: string
          item_description?: string | null
          org_id?: string | null
          original_gauge_id: string
          serial_number: string
          updated_at?: string
        }
        Update: {
          approved_at?: string
          created_at?: string
          final_gauge_id?: string
          grn_id?: string
          id?: string
          item_description?: string | null
          org_id?: string | null
          original_gauge_id?: string
          serial_number?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "approved_gauge_ids_grn_id_fkey"
            columns: ["grn_id"]
            isOneToOne: false
            referencedRelation: "goods_receipt_notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approved_gauge_ids_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_approved_gauge_ids_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      attribute_agreement_analysis: {
        Row: {
          acceptance_criteria_details: Json | null
          agreement_analysis: Json | null
          agreement_matrices: Json | null
          appraiser_names: Json | null
          characteristic_measured: string | null
          conducted_by: string
          created_at: string | null
          cross_tabulation: Json | null
          data_entry_timestamp: string | null
          detailed_effectiveness: Json | null
          effectiveness_results: Json | null
          enhanced_results: Json | null
          gauge_description: string | null
          gauge_id: string
          gauge_name: string | null
          id: string
          kappa_statistics: Json | null
          least_count: string | null
          lower_spec_limit: number | null
          measurement_data: Json | null
          measurement_range: string | null
          notes: string | null
          num_appraisers: number
          num_parts: number
          num_trials: number
          org_id: string | null
          overall_results: Json | null
          part_name: string
          part_number: string
          pdf_generated: boolean | null
          performed_by_user_role_id: string | null
          reference_values: Json | null
          status: string | null
          study_date: string
          study_name: string
          tolerance: number | null
          units: string | null
          updated_at: string | null
          upper_spec_limit: number | null
          user_id: string
        }
        Insert: {
          acceptance_criteria_details?: Json | null
          agreement_analysis?: Json | null
          agreement_matrices?: Json | null
          appraiser_names?: Json | null
          characteristic_measured?: string | null
          conducted_by: string
          created_at?: string | null
          cross_tabulation?: Json | null
          data_entry_timestamp?: string | null
          detailed_effectiveness?: Json | null
          effectiveness_results?: Json | null
          enhanced_results?: Json | null
          gauge_description?: string | null
          gauge_id: string
          gauge_name?: string | null
          id?: string
          kappa_statistics?: Json | null
          least_count?: string | null
          lower_spec_limit?: number | null
          measurement_data?: Json | null
          measurement_range?: string | null
          notes?: string | null
          num_appraisers?: number
          num_parts?: number
          num_trials?: number
          org_id?: string | null
          overall_results?: Json | null
          part_name: string
          part_number: string
          pdf_generated?: boolean | null
          performed_by_user_role_id?: string | null
          reference_values?: Json | null
          status?: string | null
          study_date?: string
          study_name: string
          tolerance?: number | null
          units?: string | null
          updated_at?: string | null
          upper_spec_limit?: number | null
          user_id: string
        }
        Update: {
          acceptance_criteria_details?: Json | null
          agreement_analysis?: Json | null
          agreement_matrices?: Json | null
          appraiser_names?: Json | null
          characteristic_measured?: string | null
          conducted_by?: string
          created_at?: string | null
          cross_tabulation?: Json | null
          data_entry_timestamp?: string | null
          detailed_effectiveness?: Json | null
          effectiveness_results?: Json | null
          enhanced_results?: Json | null
          gauge_description?: string | null
          gauge_id?: string
          gauge_name?: string | null
          id?: string
          kappa_statistics?: Json | null
          least_count?: string | null
          lower_spec_limit?: number | null
          measurement_data?: Json | null
          measurement_range?: string | null
          notes?: string | null
          num_appraisers?: number
          num_parts?: number
          num_trials?: number
          org_id?: string | null
          overall_results?: Json | null
          part_name?: string
          part_number?: string
          pdf_generated?: boolean | null
          performed_by_user_role_id?: string | null
          reference_values?: Json | null
          status?: string | null
          study_date?: string
          study_name?: string
          tolerance?: number | null
          units?: string | null
          updated_at?: string | null
          upper_spec_limit?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attribute_agreement_analysis_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_attribute_agreement_analysis_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_attribute_agreement_analysis_performed_by_user_role"
            columns: ["performed_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      bias_analysis: {
        Row: {
          alpha_value: number
          analysis_metadata: Json | null
          average_bias: number | null
          average_observed_value: number | null
          chart_data: Json | null
          conducted_by: string | null
          confidence_level_percent: number
          created_at: string | null
          data_entry_timestamp: string | null
          date: string | null
          degrees_of_freedom: number | null
          description: string | null
          dms_input_mode: boolean | null
          dms_measurements: Json | null
          dms_reference_value: Json | null
          dms_results: Json | null
          equipment_variation: number | null
          ev_percent: number | null
          id: string
          instrument_number: string
          is_acceptable: boolean | null
          least_count: string | null
          least_count_unit: string | null
          location: string | null
          lower_bound: number | null
          make: string | null
          measurement_range: string | null
          measurement_range_unit: string | null
          next_calibration_due: string | null
          org_id: string | null
          parameter: string | null
          part_name: string | null
          performed_by_user_role_id: string | null
          range: string | null
          readings: Json | null
          reference_master_value: number | null
          significant_t_value: number | null
          standard_deviation: number | null
          standard_error_mean: number | null
          t_statistic: number | null
          tolerance: string | null
          tolerance_type: string | null
          tolerance_unit: string | null
          total_tolerance: number | null
          units_of_measurement: string | null
          updated_at: string | null
          upper_bound: number | null
          user_id: string | null
        }
        Insert: {
          alpha_value?: number
          analysis_metadata?: Json | null
          average_bias?: number | null
          average_observed_value?: number | null
          chart_data?: Json | null
          conducted_by?: string | null
          confidence_level_percent?: number
          created_at?: string | null
          data_entry_timestamp?: string | null
          date?: string | null
          degrees_of_freedom?: number | null
          description?: string | null
          dms_input_mode?: boolean | null
          dms_measurements?: Json | null
          dms_reference_value?: Json | null
          dms_results?: Json | null
          equipment_variation?: number | null
          ev_percent?: number | null
          id?: string
          instrument_number: string
          is_acceptable?: boolean | null
          least_count?: string | null
          least_count_unit?: string | null
          location?: string | null
          lower_bound?: number | null
          make?: string | null
          measurement_range?: string | null
          measurement_range_unit?: string | null
          next_calibration_due?: string | null
          org_id?: string | null
          parameter?: string | null
          part_name?: string | null
          performed_by_user_role_id?: string | null
          range?: string | null
          readings?: Json | null
          reference_master_value?: number | null
          significant_t_value?: number | null
          standard_deviation?: number | null
          standard_error_mean?: number | null
          t_statistic?: number | null
          tolerance?: string | null
          tolerance_type?: string | null
          tolerance_unit?: string | null
          total_tolerance?: number | null
          units_of_measurement?: string | null
          updated_at?: string | null
          upper_bound?: number | null
          user_id?: string | null
        }
        Update: {
          alpha_value?: number
          analysis_metadata?: Json | null
          average_bias?: number | null
          average_observed_value?: number | null
          chart_data?: Json | null
          conducted_by?: string | null
          confidence_level_percent?: number
          created_at?: string | null
          data_entry_timestamp?: string | null
          date?: string | null
          degrees_of_freedom?: number | null
          description?: string | null
          dms_input_mode?: boolean | null
          dms_measurements?: Json | null
          dms_reference_value?: Json | null
          dms_results?: Json | null
          equipment_variation?: number | null
          ev_percent?: number | null
          id?: string
          instrument_number?: string
          is_acceptable?: boolean | null
          least_count?: string | null
          least_count_unit?: string | null
          location?: string | null
          lower_bound?: number | null
          make?: string | null
          measurement_range?: string | null
          measurement_range_unit?: string | null
          next_calibration_due?: string | null
          org_id?: string | null
          parameter?: string | null
          part_name?: string | null
          performed_by_user_role_id?: string | null
          range?: string | null
          readings?: Json | null
          reference_master_value?: number | null
          significant_t_value?: number | null
          standard_deviation?: number | null
          standard_error_mean?: number | null
          t_statistic?: number | null
          tolerance?: string | null
          tolerance_type?: string | null
          tolerance_unit?: string | null
          total_tolerance?: number | null
          units_of_measurement?: string | null
          updated_at?: string | null
          upper_bound?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bias_analysis_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_bias_analysis_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_bias_analysis_performed_by_user_role"
            columns: ["performed_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      bias_analysis_debug_log: {
        Row: {
          auth_uid: string | null
          id: number
          message: string | null
          org_id: string | null
          timestamp: string | null
          user_found: boolean | null
        }
        Insert: {
          auth_uid?: string | null
          id?: number
          message?: string | null
          org_id?: string | null
          timestamp?: string | null
          user_found?: boolean | null
        }
        Update: {
          auth_uid?: string | null
          id?: number
          message?: string | null
          org_id?: string | null
          timestamp?: string | null
          user_found?: boolean | null
        }
        Relationships: []
      }
      bias_analysis_form_drafts: {
        Row: {
          created_at: string
          draft_name: string
          form_data: Json
          id: string
          org_id: string | null
          readings_data: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          draft_name: string
          form_data?: Json
          id?: string
          org_id?: string | null
          readings_data?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          draft_name?: string
          form_data?: Json
          id?: string
          org_id?: string | null
          readings_data?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bias_analysis_form_drafts_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_bias_analysis_form_drafts_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      bias_dms_drafts: {
        Row: {
          created_at: string
          dms_reference_value: Json | null
          draft_name: string
          form_data: Json
          id: string
          org_id: string | null
          readings_data: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          dms_reference_value?: Json | null
          draft_name: string
          form_data?: Json
          id?: string
          org_id?: string | null
          readings_data?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          dms_reference_value?: Json | null
          draft_name?: string
          form_data?: Json
          id?: string
          org_id?: string | null
          readings_data?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bias_dms_drafts_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_bias_dms_drafts_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      bias_dms_logs: {
        Row: {
          alpha_value: number | null
          analysis_metadata: Json | null
          average_bias: number | null
          average_observed_value: number | null
          chart_data: Json | null
          conducted_by: string | null
          confidence_level_percent: number | null
          created_at: string
          data_entry_timestamp: string | null
          degrees_of_freedom: number | null
          description: string | null
          dms_measurements: Json | null
          dms_reference_value: Json | null
          dms_results: Json | null
          equipment_variation: number | null
          ev_percent: number | null
          id: string
          instrument_number: string
          is_acceptable: boolean | null
          least_count: string | null
          least_count_unit: string | null
          location: string | null
          lower_bound: number | null
          make: string | null
          measurement_range: string | null
          measurement_range_unit: string | null
          next_calibration_due: string | null
          org_id: string | null
          parameter: string | null
          part_name: string | null
          performed_by_user_role_id: string | null
          range_value: string | null
          readings: Json | null
          reference_master_value: number | null
          significant_t_value: number | null
          standard_deviation: number | null
          standard_error_mean: number | null
          study_date: string | null
          t_statistic: number | null
          tolerance: string | null
          tolerance_type: string | null
          tolerance_unit: string | null
          total_tolerance: number | null
          units_of_measurement: string | null
          updated_at: string
          upper_bound: number | null
          user_id: string
        }
        Insert: {
          alpha_value?: number | null
          analysis_metadata?: Json | null
          average_bias?: number | null
          average_observed_value?: number | null
          chart_data?: Json | null
          conducted_by?: string | null
          confidence_level_percent?: number | null
          created_at?: string
          data_entry_timestamp?: string | null
          degrees_of_freedom?: number | null
          description?: string | null
          dms_measurements?: Json | null
          dms_reference_value?: Json | null
          dms_results?: Json | null
          equipment_variation?: number | null
          ev_percent?: number | null
          id?: string
          instrument_number: string
          is_acceptable?: boolean | null
          least_count?: string | null
          least_count_unit?: string | null
          location?: string | null
          lower_bound?: number | null
          make?: string | null
          measurement_range?: string | null
          measurement_range_unit?: string | null
          next_calibration_due?: string | null
          org_id?: string | null
          parameter?: string | null
          part_name?: string | null
          performed_by_user_role_id?: string | null
          range_value?: string | null
          readings?: Json | null
          reference_master_value?: number | null
          significant_t_value?: number | null
          standard_deviation?: number | null
          standard_error_mean?: number | null
          study_date?: string | null
          t_statistic?: number | null
          tolerance?: string | null
          tolerance_type?: string | null
          tolerance_unit?: string | null
          total_tolerance?: number | null
          units_of_measurement?: string | null
          updated_at?: string
          upper_bound?: number | null
          user_id: string
        }
        Update: {
          alpha_value?: number | null
          analysis_metadata?: Json | null
          average_bias?: number | null
          average_observed_value?: number | null
          chart_data?: Json | null
          conducted_by?: string | null
          confidence_level_percent?: number | null
          created_at?: string
          data_entry_timestamp?: string | null
          degrees_of_freedom?: number | null
          description?: string | null
          dms_measurements?: Json | null
          dms_reference_value?: Json | null
          dms_results?: Json | null
          equipment_variation?: number | null
          ev_percent?: number | null
          id?: string
          instrument_number?: string
          is_acceptable?: boolean | null
          least_count?: string | null
          least_count_unit?: string | null
          location?: string | null
          lower_bound?: number | null
          make?: string | null
          measurement_range?: string | null
          measurement_range_unit?: string | null
          next_calibration_due?: string | null
          org_id?: string | null
          parameter?: string | null
          part_name?: string | null
          performed_by_user_role_id?: string | null
          range_value?: string | null
          readings?: Json | null
          reference_master_value?: number | null
          significant_t_value?: number | null
          standard_deviation?: number | null
          standard_error_mean?: number | null
          study_date?: string | null
          t_statistic?: number | null
          tolerance?: string | null
          tolerance_type?: string | null
          tolerance_unit?: string | null
          total_tolerance?: number | null
          units_of_measurement?: string | null
          updated_at?: string
          upper_bound?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bias_dms_logs_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_bias_dms_logs_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_bias_dms_logs_performed_by_user_role"
            columns: ["performed_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      broken_gauge_repair_approval_transactions: {
        Row: {
          action_type: string
          approval_id: string
          broken_gauge_repair_request_id: string
          created_at: string
          details: Json | null
          id: string
          metadata: Json | null
          org_id: string | null
          performed_by: string | null
          performed_by_name: string | null
          timestamp: string
        }
        Insert: {
          action_type: string
          approval_id: string
          broken_gauge_repair_request_id: string
          created_at?: string
          details?: Json | null
          id?: string
          metadata?: Json | null
          org_id?: string | null
          performed_by?: string | null
          performed_by_name?: string | null
          timestamp?: string
        }
        Update: {
          action_type?: string
          approval_id?: string
          broken_gauge_repair_request_id?: string
          created_at?: string
          details?: Json | null
          id?: string
          metadata?: Json | null
          org_id?: string | null
          performed_by?: string | null
          performed_by_name?: string | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "broken_gauge_repair_approval_transactions_approval_id_fkey"
            columns: ["approval_id"]
            isOneToOne: false
            referencedRelation: "broken_gauge_repair_approvals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "broken_gauge_repair_approval_transactions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_broken_gauge_repair_approval_transactions_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      broken_gauge_repair_approvals: {
        Row: {
          approval_notes: string | null
          approved_at: string | null
          approved_by: string | null
          approved_by_user_role_id: string | null
          broken_gauge_repair_request_id: string
          created_at: string
          id: string
          org_id: string | null
          rejected_at: string | null
          rejected_by: string | null
          rejected_by_user_role_id: string | null
          rejection_reason: string | null
          requested_at: string
          status: string
          updated_at: string
        }
        Insert: {
          approval_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          approved_by_user_role_id?: string | null
          broken_gauge_repair_request_id: string
          created_at?: string
          id?: string
          org_id?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejected_by_user_role_id?: string | null
          rejection_reason?: string | null
          requested_at?: string
          status?: string
          updated_at?: string
        }
        Update: {
          approval_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          approved_by_user_role_id?: string | null
          broken_gauge_repair_request_id?: string
          created_at?: string
          id?: string
          org_id?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejected_by_user_role_id?: string | null
          rejection_reason?: string | null
          requested_at?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "broken_gauge_repair_approvals_approved_by_user_role_id_fkey"
            columns: ["approved_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "broken_gauge_repair_approvals_broken_gauge_repair_request__fkey"
            columns: ["broken_gauge_repair_request_id"]
            isOneToOne: false
            referencedRelation: "broken_gauge_repair_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "broken_gauge_repair_approvals_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "broken_gauge_repair_approvals_rejected_by_user_role_id_fkey"
            columns: ["rejected_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_broken_gauge_repair_approvals_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      broken_gauge_repair_requests: {
        Row: {
          additional_comments: string | null
          approval_date: string | null
          approval_requests: Json | null
          approval_signature: string | null
          approval_status: string | null
          breakdown_details: Json | null
          breakdown_type: string
          breakdown_type_other: string | null
          company_name: string | null
          created_at: string | null
          created_by_department: string | null
          created_by_name: string | null
          created_by_role: string | null
          created_by_user_role_id: string | null
          department: string | null
          designation: string | null
          gauge_details: Json | null
          id: string
          justification_type: string | null
          justification_type_other: string | null
          org_id: string | null
          priority_level: string | null
          request_type: string
          requested_by: string | null
          required_by_date: string | null
          safety_stock_requests: Json | null
          status_updates: Json | null
          updated_at: string
          updated_by_name: string | null
          updated_by_role: string | null
          updated_by_user_role_id: string | null
        }
        Insert: {
          additional_comments?: string | null
          approval_date?: string | null
          approval_requests?: Json | null
          approval_signature?: string | null
          approval_status?: string | null
          breakdown_details?: Json | null
          breakdown_type?: string
          breakdown_type_other?: string | null
          company_name?: string | null
          created_at?: string | null
          created_by_department?: string | null
          created_by_name?: string | null
          created_by_role?: string | null
          created_by_user_role_id?: string | null
          department?: string | null
          designation?: string | null
          gauge_details?: Json | null
          id?: string
          justification_type?: string | null
          justification_type_other?: string | null
          org_id?: string | null
          priority_level?: string | null
          request_type: string
          requested_by?: string | null
          required_by_date?: string | null
          safety_stock_requests?: Json | null
          status_updates?: Json | null
          updated_at?: string
          updated_by_name?: string | null
          updated_by_role?: string | null
          updated_by_user_role_id?: string | null
        }
        Update: {
          additional_comments?: string | null
          approval_date?: string | null
          approval_requests?: Json | null
          approval_signature?: string | null
          approval_status?: string | null
          breakdown_details?: Json | null
          breakdown_type?: string
          breakdown_type_other?: string | null
          company_name?: string | null
          created_at?: string | null
          created_by_department?: string | null
          created_by_name?: string | null
          created_by_role?: string | null
          created_by_user_role_id?: string | null
          department?: string | null
          designation?: string | null
          gauge_details?: Json | null
          id?: string
          justification_type?: string | null
          justification_type_other?: string | null
          org_id?: string | null
          priority_level?: string | null
          request_type?: string
          requested_by?: string | null
          required_by_date?: string | null
          safety_stock_requests?: Json | null
          status_updates?: Json | null
          updated_at?: string
          updated_by_name?: string | null
          updated_by_role?: string | null
          updated_by_user_role_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "broken_gauge_repair_requests_created_by_user_role_id_fkey"
            columns: ["created_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "broken_gauge_repair_requests_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "broken_gauge_repair_requests_updated_by_user_role_id_fkey"
            columns: ["updated_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_broken_gauge_repair_requests_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      calibration_approval_transactions: {
        Row: {
          action_type: string
          approval_id: string
          created_at: string
          details: Json | null
          id: string
          org_id: string | null
          performed_by: string | null
          performed_by_name: string | null
          timestamp: string
        }
        Insert: {
          action_type: string
          approval_id: string
          created_at?: string
          details?: Json | null
          id?: string
          org_id?: string | null
          performed_by?: string | null
          performed_by_name?: string | null
          timestamp?: string
        }
        Update: {
          action_type?: string
          approval_id?: string
          created_at?: string
          details?: Json | null
          id?: string
          org_id?: string | null
          performed_by?: string | null
          performed_by_name?: string | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "calibration_approval_transactions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_approval"
            columns: ["approval_id"]
            isOneToOne: false
            referencedRelation: "calibration_cycle_approvals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_calibration_approval_transactions_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      calibration_call_transactions: {
        Row: {
          created_at: string
          created_by: string | null
          created_by_department: string | null
          created_by_name: string | null
          created_by_role: string | null
          created_by_user_role_id: string | null
          description: string | null
          id: string
          org_id: string | null
          status: string
          total_gauges: number
          transaction_date: string
          transaction_id: string
          updated_at: string
          updated_by_name: string | null
          updated_by_role: string | null
          updated_by_user_role_id: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          created_by_department?: string | null
          created_by_name?: string | null
          created_by_role?: string | null
          created_by_user_role_id?: string | null
          description?: string | null
          id?: string
          org_id?: string | null
          status?: string
          total_gauges?: number
          transaction_date?: string
          transaction_id: string
          updated_at?: string
          updated_by_name?: string | null
          updated_by_role?: string | null
          updated_by_user_role_id?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          created_by_department?: string | null
          created_by_name?: string | null
          created_by_role?: string | null
          created_by_user_role_id?: string | null
          description?: string | null
          id?: string
          org_id?: string | null
          status?: string
          total_gauges?: number
          transaction_date?: string
          transaction_id?: string
          updated_at?: string
          updated_by_name?: string | null
          updated_by_role?: string | null
          updated_by_user_role_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calibration_call_transactions_created_by_user_role_id_fkey"
            columns: ["created_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calibration_call_transactions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calibration_call_transactions_updated_by_user_role_id_fkey"
            columns: ["updated_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_calibration_call_transactions_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      calibration_cycle_acknowledgments: {
        Row: {
          acknowledged_at: string | null
          acknowledged_by: string | null
          acknowledgment_notes: string | null
          approval_id: string
          calibration_history_id: string
          created_at: string
          cycle_id: string
          cycle_number: number
          gauge_display_id: string
          gauge_id: string
          id: string
          org_id: string | null
          rejected_at: string | null
          rejected_by: string | null
          rejection_reason: string | null
          status: string
          updated_at: string
        }
        Insert: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          acknowledgment_notes?: string | null
          approval_id: string
          calibration_history_id: string
          created_at?: string
          cycle_id: string
          cycle_number: number
          gauge_display_id: string
          gauge_id: string
          id?: string
          org_id?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          acknowledgment_notes?: string | null
          approval_id?: string
          calibration_history_id?: string
          created_at?: string
          cycle_id?: string
          cycle_number?: number
          gauge_display_id?: string
          gauge_id?: string
          id?: string
          org_id?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "calibration_cycle_acknowledgments_approval_id_fkey"
            columns: ["approval_id"]
            isOneToOne: false
            referencedRelation: "calibration_cycle_approvals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calibration_cycle_acknowledgments_calibration_history_id_fkey"
            columns: ["calibration_history_id"]
            isOneToOne: false
            referencedRelation: "calibration_history"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calibration_cycle_acknowledgments_gauge_id_fkey"
            columns: ["gauge_id"]
            isOneToOne: false
            referencedRelation: "gauges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calibration_cycle_acknowledgments_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_calibration_cycle_acknowledgments_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      calibration_cycle_approvals: {
        Row: {
          approval_notes: string | null
          approved_at: string | null
          approved_by: string | null
          approved_by_user_role_id: string | null
          calibration_history_id: string
          created_at: string
          cycle_data: Json | null
          cycle_id: string
          cycle_number: number
          gauge_display_id: string | null
          gauge_id: string
          gauge_name: string | null
          gauge_serial_number: string | null
          id: string
          org_id: string | null
          rejected_at: string | null
          rejected_by: string | null
          rejected_by_user_role_id: string | null
          rejection_action: string | null
          rejection_reason: string | null
          status: string
          submitted_at: string
          updated_at: string
        }
        Insert: {
          approval_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          approved_by_user_role_id?: string | null
          calibration_history_id: string
          created_at?: string
          cycle_data?: Json | null
          cycle_id: string
          cycle_number: number
          gauge_display_id?: string | null
          gauge_id: string
          gauge_name?: string | null
          gauge_serial_number?: string | null
          id?: string
          org_id?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejected_by_user_role_id?: string | null
          rejection_action?: string | null
          rejection_reason?: string | null
          status?: string
          submitted_at?: string
          updated_at?: string
        }
        Update: {
          approval_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          approved_by_user_role_id?: string | null
          calibration_history_id?: string
          created_at?: string
          cycle_data?: Json | null
          cycle_id?: string
          cycle_number?: number
          gauge_display_id?: string | null
          gauge_id?: string
          gauge_name?: string | null
          gauge_serial_number?: string | null
          id?: string
          org_id?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejected_by_user_role_id?: string | null
          rejection_action?: string | null
          rejection_reason?: string | null
          status?: string
          submitted_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "calibration_cycle_approvals_approved_by_user_role_id_fkey"
            columns: ["approved_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calibration_cycle_approvals_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calibration_cycle_approvals_rejected_by_user_role_id_fkey"
            columns: ["rejected_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_calibration_cycle_approvals_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_calibration_history"
            columns: ["calibration_history_id"]
            isOneToOne: false
            referencedRelation: "calibration_history"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_gauge"
            columns: ["gauge_id"]
            isOneToOne: false
            referencedRelation: "gauges"
            referencedColumns: ["id"]
          },
        ]
      }
      calibration_cycle_audit_log: {
        Row: {
          action_type: string
          calibration_history_id: string
          changes_made: Json | null
          created_at: string
          cycle_id: string
          id: string
          org_id: string | null
          performed_by: string | null
          performed_by_name: string | null
          previous_values: Json | null
          timestamp: string
        }
        Insert: {
          action_type: string
          calibration_history_id: string
          changes_made?: Json | null
          created_at?: string
          cycle_id: string
          id?: string
          org_id?: string | null
          performed_by?: string | null
          performed_by_name?: string | null
          previous_values?: Json | null
          timestamp?: string
        }
        Update: {
          action_type?: string
          calibration_history_id?: string
          changes_made?: Json | null
          created_at?: string
          cycle_id?: string
          id?: string
          org_id?: string | null
          performed_by?: string | null
          performed_by_name?: string | null
          previous_values?: Json | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "calibration_cycle_audit_log_calibration_history_id_fkey"
            columns: ["calibration_history_id"]
            isOneToOne: false
            referencedRelation: "calibration_history"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calibration_cycle_audit_log_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_calibration_cycle_audit_log_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      calibration_history: {
        Row: {
          approval_date: string | null
          approval_status: string | null
          approved_by: string | null
          calibrated_by: string | null
          calibration_agency: string | null
          calibration_cost: Json | null
          calibration_date: string
          calibration_due_date: string | null
          calibration_process_notes: string | null
          calibration_report_id: string | null
          certificate_number: string | null
          completion_tracking: Json | null
          created_at: string
          created_by: string | null
          cycle_certificates_data: Json | null
          cycle_data: Json | null
          cycle_lock_status: Json | null
          environmental_conditions: Json | null
          gauge_id: string
          id: string
          inspection_date: string | null
          inspection_disposition: string | null
          inspector_name: string | null
          inspector_signature: string | null
          last_sync_to_gauge: string | null
          master_standards: Json | null
          masters_traceability_certificate_url: string | null
          nabl_scope_url: string | null
          org_id: string | null
          reference_standard: string | null
          remarks: string | null
          result_parameters: Json | null
          units_of_measurement: string | null
          updated_at: string
          visual_parameters: Json | null
        }
        Insert: {
          approval_date?: string | null
          approval_status?: string | null
          approved_by?: string | null
          calibrated_by?: string | null
          calibration_agency?: string | null
          calibration_cost?: Json | null
          calibration_date: string
          calibration_due_date?: string | null
          calibration_process_notes?: string | null
          calibration_report_id?: string | null
          certificate_number?: string | null
          completion_tracking?: Json | null
          created_at?: string
          created_by?: string | null
          cycle_certificates_data?: Json | null
          cycle_data?: Json | null
          cycle_lock_status?: Json | null
          environmental_conditions?: Json | null
          gauge_id: string
          id?: string
          inspection_date?: string | null
          inspection_disposition?: string | null
          inspector_name?: string | null
          inspector_signature?: string | null
          last_sync_to_gauge?: string | null
          master_standards?: Json | null
          masters_traceability_certificate_url?: string | null
          nabl_scope_url?: string | null
          org_id?: string | null
          reference_standard?: string | null
          remarks?: string | null
          result_parameters?: Json | null
          units_of_measurement?: string | null
          updated_at?: string
          visual_parameters?: Json | null
        }
        Update: {
          approval_date?: string | null
          approval_status?: string | null
          approved_by?: string | null
          calibrated_by?: string | null
          calibration_agency?: string | null
          calibration_cost?: Json | null
          calibration_date?: string
          calibration_due_date?: string | null
          calibration_process_notes?: string | null
          calibration_report_id?: string | null
          certificate_number?: string | null
          completion_tracking?: Json | null
          created_at?: string
          created_by?: string | null
          cycle_certificates_data?: Json | null
          cycle_data?: Json | null
          cycle_lock_status?: Json | null
          environmental_conditions?: Json | null
          gauge_id?: string
          id?: string
          inspection_date?: string | null
          inspection_disposition?: string | null
          inspector_name?: string | null
          inspector_signature?: string | null
          last_sync_to_gauge?: string | null
          master_standards?: Json | null
          masters_traceability_certificate_url?: string | null
          nabl_scope_url?: string | null
          org_id?: string | null
          reference_standard?: string | null
          remarks?: string | null
          result_parameters?: Json | null
          units_of_measurement?: string | null
          updated_at?: string
          visual_parameters?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "calibration_history_gauge_id_fkey"
            columns: ["gauge_id"]
            isOneToOne: false
            referencedRelation: "gauges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calibration_history_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_calibration_history_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      calibration_purchase_orders: {
        Row: {
          acceptance_criteria: string | null
          accuracy_requirement: string | null
          billing_address: string | null
          calibration_due_date: string | null
          calibration_type: string
          company_signatory_date: string | null
          company_signatory_designation: string | null
          company_signatory_name: string | null
          company_signatory_signature: string | null
          contact_email: string | null
          contact_name: string | null
          contact_person: string | null
          contact_phone: string | null
          created_at: string | null
          created_by: string | null
          delivery_mode: string | null
          email: string | null
          expected_completion_date: string | null
          gst_tax_details: string | null
          id: string
          instrument_id: string
          instrument_name: string
          last_calibration_date: string | null
          location: string | null
          manufacturer: string
          model_number: string | null
          org_id: string | null
          other_terms: string | null
          payment_terms: string | null
          payment_terms_other: string | null
          phone: string | null
          po_date: string
          po_number: string
          serial_number: string
          standard_reference: string | null
          status: string | null
          total_cost: number | null
          updated_at: string | null
          vendor_name: string
          vendor_signatory_date: string | null
          vendor_signatory_designation: string | null
          vendor_signatory_name: string | null
          vendor_signatory_signature: string | null
          warranty_certification_required: boolean | null
        }
        Insert: {
          acceptance_criteria?: string | null
          accuracy_requirement?: string | null
          billing_address?: string | null
          calibration_due_date?: string | null
          calibration_type: string
          company_signatory_date?: string | null
          company_signatory_designation?: string | null
          company_signatory_name?: string | null
          company_signatory_signature?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          created_at?: string | null
          created_by?: string | null
          delivery_mode?: string | null
          email?: string | null
          expected_completion_date?: string | null
          gst_tax_details?: string | null
          id?: string
          instrument_id: string
          instrument_name: string
          last_calibration_date?: string | null
          location?: string | null
          manufacturer: string
          model_number?: string | null
          org_id?: string | null
          other_terms?: string | null
          payment_terms?: string | null
          payment_terms_other?: string | null
          phone?: string | null
          po_date?: string
          po_number: string
          serial_number: string
          standard_reference?: string | null
          status?: string | null
          total_cost?: number | null
          updated_at?: string | null
          vendor_name: string
          vendor_signatory_date?: string | null
          vendor_signatory_designation?: string | null
          vendor_signatory_name?: string | null
          vendor_signatory_signature?: string | null
          warranty_certification_required?: boolean | null
        }
        Update: {
          acceptance_criteria?: string | null
          accuracy_requirement?: string | null
          billing_address?: string | null
          calibration_due_date?: string | null
          calibration_type?: string
          company_signatory_date?: string | null
          company_signatory_designation?: string | null
          company_signatory_name?: string | null
          company_signatory_signature?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          created_at?: string | null
          created_by?: string | null
          delivery_mode?: string | null
          email?: string | null
          expected_completion_date?: string | null
          gst_tax_details?: string | null
          id?: string
          instrument_id?: string
          instrument_name?: string
          last_calibration_date?: string | null
          location?: string | null
          manufacturer?: string
          model_number?: string | null
          org_id?: string | null
          other_terms?: string | null
          payment_terms?: string | null
          payment_terms_other?: string | null
          phone?: string | null
          po_date?: string
          po_number?: string
          serial_number?: string
          standard_reference?: string | null
          status?: string | null
          total_cost?: number | null
          updated_at?: string | null
          vendor_name?: string
          vendor_signatory_date?: string | null
          vendor_signatory_designation?: string | null
          vendor_signatory_name?: string | null
          vendor_signatory_signature?: string | null
          warranty_certification_required?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_calibration_purchase_orders_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      calibration_request_approval_transactions: {
        Row: {
          action_type: string
          approval_id: string
          calibration_request_id: string
          created_at: string
          details: Json | null
          id: string
          metadata: Json | null
          org_id: string | null
          performed_by: string | null
          performed_by_name: string | null
          timestamp: string
        }
        Insert: {
          action_type: string
          approval_id: string
          calibration_request_id: string
          created_at?: string
          details?: Json | null
          id?: string
          metadata?: Json | null
          org_id?: string | null
          performed_by?: string | null
          performed_by_name?: string | null
          timestamp?: string
        }
        Update: {
          action_type?: string
          approval_id?: string
          calibration_request_id?: string
          created_at?: string
          details?: Json | null
          id?: string
          metadata?: Json | null
          org_id?: string | null
          performed_by?: string | null
          performed_by_name?: string | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "calibration_request_approval_transa_calibration_request_id_fkey"
            columns: ["calibration_request_id"]
            isOneToOne: false
            referencedRelation: "calibration_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calibration_request_approval_transactions_approval_id_fkey"
            columns: ["approval_id"]
            isOneToOne: false
            referencedRelation: "calibration_request_approvals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calibration_request_approval_transactions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      calibration_request_approvals: {
        Row: {
          approval_comment: string | null
          approval_notes: string | null
          approved_at: string | null
          approved_by: string | null
          approver_name: string | null
          calibration_request_id: string
          created_at: string
          id: string
          org_id: string | null
          rejected_at: string | null
          rejected_by: string | null
          rejection_comment: string | null
          rejection_reason: string | null
          requested_at: string
          status: string
          updated_at: string
        }
        Insert: {
          approval_comment?: string | null
          approval_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          approver_name?: string | null
          calibration_request_id: string
          created_at?: string
          id?: string
          org_id?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_comment?: string | null
          rejection_reason?: string | null
          requested_at?: string
          status?: string
          updated_at?: string
        }
        Update: {
          approval_comment?: string | null
          approval_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          approver_name?: string | null
          calibration_request_id?: string
          created_at?: string
          id?: string
          org_id?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_comment?: string | null
          rejection_reason?: string | null
          requested_at?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "calibration_request_approvals_calibration_request_id_fkey"
            columns: ["calibration_request_id"]
            isOneToOne: false
            referencedRelation: "calibration_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_calibration_request_approvals_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      calibration_requests: {
        Row: {
          acceptance_criteria: string
          accuracy_requirement: string
          approval_notes: string | null
          approval_status: string | null
          approved_at: string | null
          approved_by: string | null
          auth_user_id: string | null
          calibration_due_date: string
          calibration_interval: string
          calibration_type: string
          certification_required: boolean | null
          created_at: string | null
          department: string
          generated_id: string | null
          id: string
          instrument_id: string
          instrument_name: string
          last_calibration_date: string | null
          location: string
          manufacturer: string
          model_number: string | null
          org_id: string | null
          priority: string
          rejected_at: string | null
          rejected_by: string | null
          rejection_reason: string | null
          request_date: string
          requester_email: string
          requester_name: string
          serial_number: string
          special_instructions: string | null
          standard: string
          status: string
          uncertainty_measurement_required: boolean | null
          updated_at: string | null
        }
        Insert: {
          acceptance_criteria: string
          accuracy_requirement: string
          approval_notes?: string | null
          approval_status?: string | null
          approved_at?: string | null
          approved_by?: string | null
          auth_user_id?: string | null
          calibration_due_date: string
          calibration_interval: string
          calibration_type: string
          certification_required?: boolean | null
          created_at?: string | null
          department: string
          generated_id?: string | null
          id?: string
          instrument_id: string
          instrument_name: string
          last_calibration_date?: string | null
          location: string
          manufacturer: string
          model_number?: string | null
          org_id?: string | null
          priority: string
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?: string | null
          request_date: string
          requester_email: string
          requester_name: string
          serial_number: string
          special_instructions?: string | null
          standard: string
          status?: string
          uncertainty_measurement_required?: boolean | null
          updated_at?: string | null
        }
        Update: {
          acceptance_criteria?: string
          accuracy_requirement?: string
          approval_notes?: string | null
          approval_status?: string | null
          approved_at?: string | null
          approved_by?: string | null
          auth_user_id?: string | null
          calibration_due_date?: string
          calibration_interval?: string
          calibration_type?: string
          certification_required?: boolean | null
          created_at?: string | null
          department?: string
          generated_id?: string | null
          id?: string
          instrument_id?: string
          instrument_name?: string
          last_calibration_date?: string | null
          location?: string
          manufacturer?: string
          model_number?: string | null
          org_id?: string | null
          priority?: string
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?: string | null
          request_date?: string
          requester_email?: string
          requester_name?: string
          serial_number?: string
          special_instructions?: string | null
          standard?: string
          status?: string
          uncertainty_measurement_required?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calibration_requests_auth_user_id_fkey"
            columns: ["auth_user_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calibration_requests_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      calibration_transaction_deletion_logs: {
        Row: {
          created_at: string
          deleted_at: string
          deleted_by: string | null
          deletion_reason: string | null
          id: string
          org_id: string | null
          original_transaction_id: string
          transaction_data: Json
        }
        Insert: {
          created_at?: string
          deleted_at?: string
          deleted_by?: string | null
          deletion_reason?: string | null
          id?: string
          org_id?: string | null
          original_transaction_id: string
          transaction_data: Json
        }
        Update: {
          created_at?: string
          deleted_at?: string
          deleted_by?: string | null
          deletion_reason?: string | null
          id?: string
          org_id?: string | null
          original_transaction_id?: string
          transaction_data?: Json
        }
        Relationships: [
          {
            foreignKeyName: "fk_calibration_transaction_deletion_logs_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      calibration_transaction_gauges: {
        Row: {
          created_at: string
          gauge_id: string
          id: string
          org_id: string | null
          transaction_id: string
        }
        Insert: {
          created_at?: string
          gauge_id: string
          id?: string
          org_id?: string | null
          transaction_id: string
        }
        Update: {
          created_at?: string
          gauge_id?: string
          id?: string
          org_id?: string | null
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "calibration_transaction_gauges_gauge_id_fkey"
            columns: ["gauge_id"]
            isOneToOne: false
            referencedRelation: "gauges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calibration_transaction_gauges_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calibration_transaction_gauges_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "calibration_call_transactions"
            referencedColumns: ["transaction_id"]
          },
        ]
      }
      calibration_vendors: {
        Row: {
          contact_email: string | null
          contact_person: string | null
          contact_phone: string | null
          created_at: string
          created_by_user_role_id: string | null
          id: string
          is_active: boolean
          org_id: string | null
          updated_at: string
          vendor_address: string | null
          vendor_name: string
        }
        Insert: {
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          created_at?: string
          created_by_user_role_id?: string | null
          id?: string
          is_active?: boolean
          org_id?: string | null
          updated_at?: string
          vendor_address?: string | null
          vendor_name: string
        }
        Update: {
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          created_at?: string
          created_by_user_role_id?: string | null
          id?: string
          is_active?: boolean
          org_id?: string | null
          updated_at?: string
          vendor_address?: string | null
          vendor_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "calibration_vendors_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_email_verifications: {
        Row: {
          created_at: string
          email: string
          expires_at: string
          id: string
          org_id: string | null
          status: string
          user_id: string
          verification_token: string
          verified_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          expires_at?: string
          id?: string
          org_id?: string | null
          status?: string
          user_id: string
          verification_token: string
          verified_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          org_id?: string | null
          status?: string
          user_id?: string
          verification_token?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_custom_email_verifications_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          address: string | null
          city: string | null
          company: string | null
          country: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          notes: string | null
          org_id: string | null
          phone: string | null
          state: string | null
          status: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          company?: string | null
          country?: string | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          notes?: string | null
          org_id?: string | null
          phone?: string | null
          state?: string | null
          status?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          company?: string | null
          country?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          notes?: string | null
          org_id?: string | null
          phone?: string | null
          state?: string | null
          status?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      dispatch_challan_gauges: {
        Row: {
          created_at: string
          dispatch_challan_id: string
          gauge_id: string
          id: string
          org_id: string | null
        }
        Insert: {
          created_at?: string
          dispatch_challan_id: string
          gauge_id: string
          id?: string
          org_id?: string | null
        }
        Update: {
          created_at?: string
          dispatch_challan_id?: string
          gauge_id?: string
          id?: string
          org_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dispatch_challan_gauges_dispatch_challan_id_fkey"
            columns: ["dispatch_challan_id"]
            isOneToOne: false
            referencedRelation: "dispatch_challans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dispatch_challan_gauges_gauge_id_fkey"
            columns: ["gauge_id"]
            isOneToOne: false
            referencedRelation: "gauges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_dispatch_challan_gauges_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      dispatch_challans: {
        Row: {
          authorized_by: string | null
          contact_email: string | null
          contact_person: string
          contact_phone: string | null
          created_at: string
          created_by_user_role_id: string | null
          dc_number: string
          department: string
          dispatch_date: string
          expected_return_date: string | null
          id: string
          org_id: string | null
          prepared_by: string
          returnable: boolean
          special_instructions: string | null
          status: string
          total_cost: number | null
          total_gauges: number
          transport_mode: string | null
          updated_at: string
          vendor_address: string | null
          vendor_name: string
        }
        Insert: {
          authorized_by?: string | null
          contact_email?: string | null
          contact_person: string
          contact_phone?: string | null
          created_at?: string
          created_by_user_role_id?: string | null
          dc_number: string
          department: string
          dispatch_date: string
          expected_return_date?: string | null
          id?: string
          org_id?: string | null
          prepared_by: string
          returnable?: boolean
          special_instructions?: string | null
          status?: string
          total_cost?: number | null
          total_gauges?: number
          transport_mode?: string | null
          updated_at?: string
          vendor_address?: string | null
          vendor_name: string
        }
        Update: {
          authorized_by?: string | null
          contact_email?: string | null
          contact_person?: string
          contact_phone?: string | null
          created_at?: string
          created_by_user_role_id?: string | null
          dc_number?: string
          department?: string
          dispatch_date?: string
          expected_return_date?: string | null
          id?: string
          org_id?: string | null
          prepared_by?: string
          returnable?: boolean
          special_instructions?: string | null
          status?: string
          total_cost?: number | null
          total_gauges?: number
          transport_mode?: string | null
          updated_at?: string
          vendor_address?: string | null
          vendor_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "dispatch_challans_created_by_user_role_id_fkey"
            columns: ["created_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_dispatch_challans_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      gage_rr_chart_data: {
        Row: {
          chart_data: Json
          chart_type: string
          computed_at: string
          id: string
          org_id: string | null
          study_id: string | null
        }
        Insert: {
          chart_data: Json
          chart_type: string
          computed_at?: string
          id?: string
          org_id?: string | null
          study_id?: string | null
        }
        Update: {
          chart_data?: Json
          chart_type?: string
          computed_at?: string
          id?: string
          org_id?: string | null
          study_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gage_rr_chart_data_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gage_rr_chart_data_study_id_fkey"
            columns: ["study_id"]
            isOneToOne: false
            referencedRelation: "gage_rr_studies"
            referencedColumns: ["id"]
          },
        ]
      }
      gage_rr_dms_form_drafts: {
        Row: {
          appraiser_names: Json
          created_at: string
          draft_name: string
          form_data: Json
          id: string
          measurement_data: Json
          org_id: string | null
          study_configuration: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          appraiser_names?: Json
          created_at?: string
          draft_name: string
          form_data?: Json
          id?: string
          measurement_data?: Json
          org_id?: string | null
          study_configuration?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          appraiser_names?: Json
          created_at?: string
          draft_name?: string
          form_data?: Json
          id?: string
          measurement_data?: Json
          org_id?: string | null
          study_configuration?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gage_rr_dms_form_drafts_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      gage_rr_dms_studies: {
        Row: {
          acceptability_status: string | null
          analysis_results: Json | null
          appraiser_names: Json
          characteristic_measured: string | null
          chart_data: Json | null
          conducted_by: string
          created_at: string
          data_entry_timestamp: string | null
          dms_analysis_metadata: Json | null
          dms_measurement_data: Json | null
          equipment_variation: number | null
          gauge_description: string | null
          gauge_id: string
          gauge_name: string | null
          gauge_no: string | null
          id: string
          max_specification: number | null
          measurement_data: Json
          min_specification: number | null
          notes: string | null
          num_appraisers: number
          num_parts: number
          num_trials: number
          org_id: string | null
          part_name: string
          part_number: string
          performed_by_user_role_id: string | null
          product: string
          recommendations: Json | null
          rr_percent: number | null
          specification: string | null
          status: string
          study_date: string
          study_name: string
          total_variation: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          acceptability_status?: string | null
          analysis_results?: Json | null
          appraiser_names?: Json
          characteristic_measured?: string | null
          chart_data?: Json | null
          conducted_by: string
          created_at?: string
          data_entry_timestamp?: string | null
          dms_analysis_metadata?: Json | null
          dms_measurement_data?: Json | null
          equipment_variation?: number | null
          gauge_description?: string | null
          gauge_id: string
          gauge_name?: string | null
          gauge_no?: string | null
          id?: string
          max_specification?: number | null
          measurement_data?: Json
          min_specification?: number | null
          notes?: string | null
          num_appraisers?: number
          num_parts?: number
          num_trials?: number
          org_id?: string | null
          part_name: string
          part_number: string
          performed_by_user_role_id?: string | null
          product: string
          recommendations?: Json | null
          rr_percent?: number | null
          specification?: string | null
          status?: string
          study_date?: string
          study_name: string
          total_variation?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          acceptability_status?: string | null
          analysis_results?: Json | null
          appraiser_names?: Json
          characteristic_measured?: string | null
          chart_data?: Json | null
          conducted_by?: string
          created_at?: string
          data_entry_timestamp?: string | null
          dms_analysis_metadata?: Json | null
          dms_measurement_data?: Json | null
          equipment_variation?: number | null
          gauge_description?: string | null
          gauge_id?: string
          gauge_name?: string | null
          gauge_no?: string | null
          id?: string
          max_specification?: number | null
          measurement_data?: Json
          min_specification?: number | null
          notes?: string | null
          num_appraisers?: number
          num_parts?: number
          num_trials?: number
          org_id?: string | null
          part_name?: string
          part_number?: string
          performed_by_user_role_id?: string | null
          product?: string
          recommendations?: Json | null
          rr_percent?: number | null
          specification?: string | null
          status?: string
          study_date?: string
          study_name?: string
          total_variation?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_gage_rr_dms_studies_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      gage_rr_form_drafts: {
        Row: {
          appraiser_names: Json
          created_at: string
          draft_name: string
          form_data: Json
          id: string
          measurement_data: Json
          org_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          appraiser_names?: Json
          created_at?: string
          draft_name: string
          form_data?: Json
          id?: string
          measurement_data?: Json
          org_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          appraiser_names?: Json
          created_at?: string
          draft_name?: string
          form_data?: Json
          id?: string
          measurement_data?: Json
          org_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_gage_rr_form_drafts_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gage_rr_form_drafts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      gage_rr_studies: {
        Row: {
          acceptability_status: string | null
          appraiser_names: Json
          appraiser_variation: number | null
          av_percent_study_var: number | null
          av_percent_tolerance: number | null
          characteristic_measured: string
          conducted_by: string
          cp_capability: number | null
          cpk_capability: number | null
          created_at: string
          data_entry_timestamp: string | null
          equipment_variation: number | null
          ev_percent_study_var: number | null
          ev_percent_tolerance: number | null
          gauge_description: string
          gauge_id: string
          gauge_no: string
          grand_average: number | null
          grand_range_average: number | null
          id: string
          k1_constant: number | null
          k2_constant: number | null
          k3_constant: number | null
          lsl_specification: number | null
          max_specification: number | null
          measurement_data: Json
          min_specification: number | null
          notes: string | null
          num_appraisers: number
          num_parts: number
          num_trials: number
          org_id: string | null
          part_name: string
          part_number: string
          part_variation: number | null
          performed_by_user_role_id: string | null
          pp_performance: number | null
          ppk_performance: number | null
          process_mean: number | null
          process_std_dev: number | null
          product: string
          pv_percent_study_var: number | null
          pv_percent_tolerance: number | null
          range_of_appraiser_averages: number | null
          range_of_part_averages: number | null
          recommendations: Json | null
          repeatability_reproducibility: number | null
          rr_percent_study_var: number | null
          rr_percent_tolerance: number | null
          sigma_level: number | null
          six_sigma_metadata: Json | null
          specification: string
          status: string
          study_date: string
          study_name: string
          total_variation: number | null
          updated_at: string
          user_id: string | null
          usl_specification: number | null
        }
        Insert: {
          acceptability_status?: string | null
          appraiser_names?: Json
          appraiser_variation?: number | null
          av_percent_study_var?: number | null
          av_percent_tolerance?: number | null
          characteristic_measured: string
          conducted_by: string
          cp_capability?: number | null
          cpk_capability?: number | null
          created_at?: string
          data_entry_timestamp?: string | null
          equipment_variation?: number | null
          ev_percent_study_var?: number | null
          ev_percent_tolerance?: number | null
          gauge_description: string
          gauge_id: string
          gauge_no: string
          grand_average?: number | null
          grand_range_average?: number | null
          id?: string
          k1_constant?: number | null
          k2_constant?: number | null
          k3_constant?: number | null
          lsl_specification?: number | null
          max_specification?: number | null
          measurement_data?: Json
          min_specification?: number | null
          notes?: string | null
          num_appraisers?: number
          num_parts?: number
          num_trials?: number
          org_id?: string | null
          part_name: string
          part_number: string
          part_variation?: number | null
          performed_by_user_role_id?: string | null
          pp_performance?: number | null
          ppk_performance?: number | null
          process_mean?: number | null
          process_std_dev?: number | null
          product: string
          pv_percent_study_var?: number | null
          pv_percent_tolerance?: number | null
          range_of_appraiser_averages?: number | null
          range_of_part_averages?: number | null
          recommendations?: Json | null
          repeatability_reproducibility?: number | null
          rr_percent_study_var?: number | null
          rr_percent_tolerance?: number | null
          sigma_level?: number | null
          six_sigma_metadata?: Json | null
          specification: string
          status?: string
          study_date?: string
          study_name: string
          total_variation?: number | null
          updated_at?: string
          user_id?: string | null
          usl_specification?: number | null
        }
        Update: {
          acceptability_status?: string | null
          appraiser_names?: Json
          appraiser_variation?: number | null
          av_percent_study_var?: number | null
          av_percent_tolerance?: number | null
          characteristic_measured?: string
          conducted_by?: string
          cp_capability?: number | null
          cpk_capability?: number | null
          created_at?: string
          data_entry_timestamp?: string | null
          equipment_variation?: number | null
          ev_percent_study_var?: number | null
          ev_percent_tolerance?: number | null
          gauge_description?: string
          gauge_id?: string
          gauge_no?: string
          grand_average?: number | null
          grand_range_average?: number | null
          id?: string
          k1_constant?: number | null
          k2_constant?: number | null
          k3_constant?: number | null
          lsl_specification?: number | null
          max_specification?: number | null
          measurement_data?: Json
          min_specification?: number | null
          notes?: string | null
          num_appraisers?: number
          num_parts?: number
          num_trials?: number
          org_id?: string | null
          part_name?: string
          part_number?: string
          part_variation?: number | null
          performed_by_user_role_id?: string | null
          pp_performance?: number | null
          ppk_performance?: number | null
          process_mean?: number | null
          process_std_dev?: number | null
          product?: string
          pv_percent_study_var?: number | null
          pv_percent_tolerance?: number | null
          range_of_appraiser_averages?: number | null
          range_of_part_averages?: number | null
          recommendations?: Json | null
          repeatability_reproducibility?: number | null
          rr_percent_study_var?: number | null
          rr_percent_tolerance?: number | null
          sigma_level?: number | null
          six_sigma_metadata?: Json | null
          specification?: string
          status?: string
          study_date?: string
          study_name?: string
          total_variation?: number | null
          updated_at?: string
          user_id?: string | null
          usl_specification?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_gage_rr_studies_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_gage_rr_studies_performed_by_user_role"
            columns: ["performed_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gage_rr_studies_gauge_id_fkey"
            columns: ["gauge_id"]
            isOneToOne: false
            referencedRelation: "gauges"
            referencedColumns: ["id"]
          },
        ]
      }
      gage_rr_study_logs: {
        Row: {
          action_type: string
          changes_made: Json | null
          id: string
          notes: string | null
          org_id: string | null
          performed_by: string
          performed_by_id: string | null
          previous_values: Json | null
          study_id: string | null
          timestamp: string
        }
        Insert: {
          action_type: string
          changes_made?: Json | null
          id?: string
          notes?: string | null
          org_id?: string | null
          performed_by: string
          performed_by_id?: string | null
          previous_values?: Json | null
          study_id?: string | null
          timestamp?: string
        }
        Update: {
          action_type?: string
          changes_made?: Json | null
          id?: string
          notes?: string | null
          org_id?: string | null
          performed_by?: string
          performed_by_id?: string | null
          previous_values?: Json | null
          study_id?: string | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_gage_rr_study_logs_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gage_rr_study_logs_study_id_fkey"
            columns: ["study_id"]
            isOneToOne: false
            referencedRelation: "gage_rr_studies"
            referencedColumns: ["id"]
          },
        ]
      }
      gauge_areas: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          location_id: string | null
          name: string
          org_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          location_id?: string | null
          name: string
          org_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          location_id?: string | null
          name?: string
          org_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gauge_areas_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "gauge_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gauge_areas_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      gauge_assignees: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          location_id: string | null
          name: string
          org_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          location_id?: string | null
          name: string
          org_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          location_id?: string | null
          name?: string
          org_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gauge_assignees_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "gauge_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gauge_assignees_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      gauge_custodians: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          location_id: string | null
          name: string
          org_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          location_id?: string | null
          name: string
          org_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          location_id?: string | null
          name?: string
          org_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gauge_custodians_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "gauge_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gauge_custodians_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      gauge_departments: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          location_id: string | null
          name: string
          org_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          location_id?: string | null
          name: string
          org_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          location_id?: string | null
          name?: string
          org_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gauge_departments_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "gauge_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gauge_departments_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      gauge_descriptions: {
        Row: {
          created_at: string | null
          description_name: string
          equipment_category: string
          id: string
          is_active: boolean | null
          org_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description_name: string
          equipment_category: string
          id?: string
          is_active?: boolean | null
          org_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description_name?: string
          equipment_category?: string
          id?: string
          is_active?: boolean | null
          org_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gauge_descriptions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      gauge_equipment_masters: {
        Row: {
          created_at: string | null
          gauge_id: string
          id: string
          master_equipment_id: string
          org_id: string | null
          relationship_specific_master_certificates: Json | null
          relationship_specific_nabl_certificates: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          gauge_id: string
          id?: string
          master_equipment_id: string
          org_id?: string | null
          relationship_specific_master_certificates?: Json | null
          relationship_specific_nabl_certificates?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          gauge_id?: string
          id?: string
          master_equipment_id?: string
          org_id?: string | null
          relationship_specific_master_certificates?: Json | null
          relationship_specific_nabl_certificates?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_gauge_equipment_masters_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gauge_equipment_masters_gauge_id_fkey"
            columns: ["gauge_id"]
            isOneToOne: false
            referencedRelation: "gauges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gauge_equipment_masters_master_equipment_id_fkey"
            columns: ["master_equipment_id"]
            isOneToOne: false
            referencedRelation: "gauges"
            referencedColumns: ["id"]
          },
        ]
      }
      gauge_form_drafts: {
        Row: {
          created_at: string
          draft_name: string
          form_data: Json
          id: string
          org_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          draft_name: string
          form_data: Json
          id?: string
          org_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          draft_name?: string
          form_data?: Json
          id?: string
          org_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_gauge_form_drafts_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      gauge_inspection_reports: {
        Row: {
          area_clean: boolean | null
          auth_user_id: string | null
          batch_no: string | null
          calibrated_gauge: boolean | null
          cleaned_part: boolean | null
          created_at: string | null
          date: string
          drawing_no: string | null
          final_result: string | null
          gauge_stored: boolean | null
          gauge_type: string
          go_plug_pass: boolean | null
          id: string
          inspection_data: Json | null
          machine_no: string | null
          ncr_report_no: string | null
          no_go_plug_pass: boolean | null
          notes: string | null
          operator_name: string
          operator_signature: string | null
          org_id: string | null
          part_name: string | null
          part_no: string | null
          results_recorded: boolean | null
          shift: string
          supervisor_signature: string | null
          thread_correct: boolean | null
          thread_spec: string | null
          tolerance_max: string | null
          tolerance_min: string | null
          updated_at: string | null
        }
        Insert: {
          area_clean?: boolean | null
          auth_user_id?: string | null
          batch_no?: string | null
          calibrated_gauge?: boolean | null
          cleaned_part?: boolean | null
          created_at?: string | null
          date: string
          drawing_no?: string | null
          final_result?: string | null
          gauge_stored?: boolean | null
          gauge_type: string
          go_plug_pass?: boolean | null
          id?: string
          inspection_data?: Json | null
          machine_no?: string | null
          ncr_report_no?: string | null
          no_go_plug_pass?: boolean | null
          notes?: string | null
          operator_name: string
          operator_signature?: string | null
          org_id?: string | null
          part_name?: string | null
          part_no?: string | null
          results_recorded?: boolean | null
          shift: string
          supervisor_signature?: string | null
          thread_correct?: boolean | null
          thread_spec?: string | null
          tolerance_max?: string | null
          tolerance_min?: string | null
          updated_at?: string | null
        }
        Update: {
          area_clean?: boolean | null
          auth_user_id?: string | null
          batch_no?: string | null
          calibrated_gauge?: boolean | null
          cleaned_part?: boolean | null
          created_at?: string | null
          date?: string
          drawing_no?: string | null
          final_result?: string | null
          gauge_stored?: boolean | null
          gauge_type?: string
          go_plug_pass?: boolean | null
          id?: string
          inspection_data?: Json | null
          machine_no?: string | null
          ncr_report_no?: string | null
          no_go_plug_pass?: boolean | null
          notes?: string | null
          operator_name?: string
          operator_signature?: string | null
          org_id?: string | null
          part_name?: string | null
          part_no?: string | null
          results_recorded?: boolean | null
          shift?: string
          supervisor_signature?: string | null
          thread_correct?: boolean | null
          thread_spec?: string | null
          tolerance_max?: string | null
          tolerance_min?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gauge_inspection_reports_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      gauge_locations: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          name: string
          org_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          org_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          org_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gauge_locations_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      gauge_missing_reports: {
        Row: {
          additional_info: string | null
          auth_user_id: string | null
          condition_when_found: string | null
          created_at: string | null
          date_found: string | null
          date_reported_missing: string | null
          documentation_updated: boolean | null
          followup_required: string | null
          found_by: string | null
          found_location: string | null
          gauge_id: string
          id: string
          last_calibration_date: string | null
          last_custodian: string | null
          last_known_location: string | null
          last_usage_date: string | null
          notes: string | null
          notifications_issued: string | null
          org_id: string | null
          possible_cause: string | null
          recovery_actions: string | null
          reported_by: string
          search_efforts: string | null
          status: string
          updated_at: string | null
          updated_custodian: string | null
          updated_location: string | null
        }
        Insert: {
          additional_info?: string | null
          auth_user_id?: string | null
          condition_when_found?: string | null
          created_at?: string | null
          date_found?: string | null
          date_reported_missing?: string | null
          documentation_updated?: boolean | null
          followup_required?: string | null
          found_by?: string | null
          found_location?: string | null
          gauge_id: string
          id?: string
          last_calibration_date?: string | null
          last_custodian?: string | null
          last_known_location?: string | null
          last_usage_date?: string | null
          notes?: string | null
          notifications_issued?: string | null
          org_id?: string | null
          possible_cause?: string | null
          recovery_actions?: string | null
          reported_by: string
          search_efforts?: string | null
          status?: string
          updated_at?: string | null
          updated_custodian?: string | null
          updated_location?: string | null
        }
        Update: {
          additional_info?: string | null
          auth_user_id?: string | null
          condition_when_found?: string | null
          created_at?: string | null
          date_found?: string | null
          date_reported_missing?: string | null
          documentation_updated?: boolean | null
          followup_required?: string | null
          found_by?: string | null
          found_location?: string | null
          gauge_id?: string
          id?: string
          last_calibration_date?: string | null
          last_custodian?: string | null
          last_known_location?: string | null
          last_usage_date?: string | null
          notes?: string | null
          notifications_issued?: string | null
          org_id?: string | null
          possible_cause?: string | null
          recovery_actions?: string | null
          reported_by?: string
          search_efforts?: string | null
          status?: string
          updated_at?: string | null
          updated_custodian?: string | null
          updated_location?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gauge_missing_reports_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      gauge_replacement_mappings: {
        Row: {
          created_at: string
          id: string
          metadata_synced: Json | null
          org_id: string | null
          original_gauge_id: string
          replacement_date: string
          replacement_gauge_id: string
          replacement_reason: string | null
          status: string
          transaction_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          metadata_synced?: Json | null
          org_id?: string | null
          original_gauge_id: string
          replacement_date?: string
          replacement_gauge_id: string
          replacement_reason?: string | null
          status?: string
          transaction_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata_synced?: Json | null
          org_id?: string | null
          original_gauge_id?: string
          replacement_date?: string
          replacement_gauge_id?: string
          replacement_reason?: string | null
          status?: string
          transaction_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gauge_replacement_mappings_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gauge_replacement_mappings_original_gauge_id_fkey"
            columns: ["original_gauge_id"]
            isOneToOne: false
            referencedRelation: "gauges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gauge_replacement_mappings_replacement_gauge_id_fkey"
            columns: ["replacement_gauge_id"]
            isOneToOne: false
            referencedRelation: "gauges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gauge_replacement_mappings_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "calibration_call_transactions"
            referencedColumns: ["transaction_id"]
          },
        ]
      }
      gauge_scrap_reports: {
        Row: {
          approval_status: string | null
          approved_at: string | null
          approved_by: string | null
          calibration_certificate_number: string | null
          calibration_due_date: string | null
          created_at: string
          created_by: string | null
          created_by_department: string | null
          created_by_name: string | null
          created_by_role: string | null
          created_by_user_role_id: string | null
          depreciated_value: number | null
          disposal_date: string | null
          disposal_method: string | null
          document_uploads: Json | null
          gauge_id: string
          gauge_type: string
          id: string
          last_calibration_date: string | null
          maintenance_history: string | null
          manufacturer: string
          model_number: string | null
          name: string
          notes: string | null
          org_id: string | null
          original_purchase_cost: number | null
          reason_details: string | null
          reason_for_scrap: string | null
          rejected_at: string | null
          rejection_reason: string | null
          scrap_authorization: boolean | null
          scrap_date: string
          scrap_id: string | null
          scrap_report_id: string | null
          scrap_value: number | null
          scrapped_by: string | null
          serial_number: string
          submitted_for_approval_at: string | null
          supporting_documents: string | null
          updated_by_name: string | null
          updated_by_role: string | null
          updated_by_user_role_id: string | null
        }
        Insert: {
          approval_status?: string | null
          approved_at?: string | null
          approved_by?: string | null
          calibration_certificate_number?: string | null
          calibration_due_date?: string | null
          created_at?: string
          created_by?: string | null
          created_by_department?: string | null
          created_by_name?: string | null
          created_by_role?: string | null
          created_by_user_role_id?: string | null
          depreciated_value?: number | null
          disposal_date?: string | null
          disposal_method?: string | null
          document_uploads?: Json | null
          gauge_id: string
          gauge_type: string
          id?: string
          last_calibration_date?: string | null
          maintenance_history?: string | null
          manufacturer: string
          model_number?: string | null
          name: string
          notes?: string | null
          org_id?: string | null
          original_purchase_cost?: number | null
          reason_details?: string | null
          reason_for_scrap?: string | null
          rejected_at?: string | null
          rejection_reason?: string | null
          scrap_authorization?: boolean | null
          scrap_date: string
          scrap_id?: string | null
          scrap_report_id?: string | null
          scrap_value?: number | null
          scrapped_by?: string | null
          serial_number: string
          submitted_for_approval_at?: string | null
          supporting_documents?: string | null
          updated_by_name?: string | null
          updated_by_role?: string | null
          updated_by_user_role_id?: string | null
        }
        Update: {
          approval_status?: string | null
          approved_at?: string | null
          approved_by?: string | null
          calibration_certificate_number?: string | null
          calibration_due_date?: string | null
          created_at?: string
          created_by?: string | null
          created_by_department?: string | null
          created_by_name?: string | null
          created_by_role?: string | null
          created_by_user_role_id?: string | null
          depreciated_value?: number | null
          disposal_date?: string | null
          disposal_method?: string | null
          document_uploads?: Json | null
          gauge_id?: string
          gauge_type?: string
          id?: string
          last_calibration_date?: string | null
          maintenance_history?: string | null
          manufacturer?: string
          model_number?: string | null
          name?: string
          notes?: string | null
          org_id?: string | null
          original_purchase_cost?: number | null
          reason_details?: string | null
          reason_for_scrap?: string | null
          rejected_at?: string | null
          rejection_reason?: string | null
          scrap_authorization?: boolean | null
          scrap_date?: string
          scrap_id?: string | null
          scrap_report_id?: string | null
          scrap_value?: number | null
          scrapped_by?: string | null
          serial_number?: string
          submitted_for_approval_at?: string | null
          supporting_documents?: string | null
          updated_by_name?: string | null
          updated_by_role?: string | null
          updated_by_user_role_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gauge_scrap_reports_created_by_user_role_id_fkey"
            columns: ["created_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gauge_scrap_reports_gauge_id_fkey"
            columns: ["gauge_id"]
            isOneToOne: false
            referencedRelation: "gauges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gauge_scrap_reports_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gauge_scrap_reports_updated_by_user_role_id_fkey"
            columns: ["updated_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      gauge_status_options: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          org_id: string | null
          status_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          org_id?: string | null
          status_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          org_id?: string | null
          status_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gauge_status_options_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      gauge_transactions: {
        Row: {
          calibration_check_required: boolean | null
          condition_after_use: string | null
          created_at: string | null
          created_by_department: string | null
          created_by_name: string | null
          created_by_role: string | null
          created_by_user_role_id: string | null
          expected_return_date: string | null
          gauge_id: string
          id: string
          issue_date: string | null
          issued_to: string
          issues_encountered: string | null
          location_of_use: string | null
          maintenance_required: boolean | null
          org_id: string | null
          project_completion: string | null
          purpose: string | null
          received_by: string | null
          return_date: string | null
          status: string
          updated_at: string | null
          updated_by_name: string | null
          updated_by_role: string | null
          updated_by_user_role_id: string | null
        }
        Insert: {
          calibration_check_required?: boolean | null
          condition_after_use?: string | null
          created_at?: string | null
          created_by_department?: string | null
          created_by_name?: string | null
          created_by_role?: string | null
          created_by_user_role_id?: string | null
          expected_return_date?: string | null
          gauge_id: string
          id?: string
          issue_date?: string | null
          issued_to: string
          issues_encountered?: string | null
          location_of_use?: string | null
          maintenance_required?: boolean | null
          org_id?: string | null
          project_completion?: string | null
          purpose?: string | null
          received_by?: string | null
          return_date?: string | null
          status?: string
          updated_at?: string | null
          updated_by_name?: string | null
          updated_by_role?: string | null
          updated_by_user_role_id?: string | null
        }
        Update: {
          calibration_check_required?: boolean | null
          condition_after_use?: string | null
          created_at?: string | null
          created_by_department?: string | null
          created_by_name?: string | null
          created_by_role?: string | null
          created_by_user_role_id?: string | null
          expected_return_date?: string | null
          gauge_id?: string
          id?: string
          issue_date?: string | null
          issued_to?: string
          issues_encountered?: string | null
          location_of_use?: string | null
          maintenance_required?: boolean | null
          org_id?: string | null
          project_completion?: string | null
          purpose?: string | null
          received_by?: string | null
          return_date?: string | null
          status?: string
          updated_at?: string | null
          updated_by_name?: string | null
          updated_by_role?: string | null
          updated_by_user_role_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_gauge_transactions_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gauge_transactions_created_by_user_role_id_fkey"
            columns: ["created_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gauge_transactions_gauge_id_fkey"
            columns: ["gauge_id"]
            isOneToOne: false
            referencedRelation: "gauges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gauge_transactions_updated_by_user_role_id_fkey"
            columns: ["updated_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      gauge_types: {
        Row: {
          created_at: string | null
          equipment_category: string
          id: string
          is_active: boolean | null
          org_id: string | null
          type_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          equipment_category?: string
          id?: string
          is_active?: boolean | null
          org_id?: string | null
          type_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          equipment_category?: string
          id?: string
          is_active?: boolean | null
          org_id?: string | null
          type_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gauge_types_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      gauges: {
        Row: {
          accuracy: string | null
          area: string | null
          asset_number: string | null
          assignee: string | null
          calibrated_by: string | null
          calibration_certificate_number: string | null
          calibration_cycles: number | null
          calibration_date: string | null
          calibration_days: number | null
          calibration_interval: string | null
          calibration_months: number | null
          calibration_procedure: string | null
          calibration_years: number | null
          category: string | null
          condition: string | null
          control_number: string
          created_by_user_role_id: string | null
          created_date: string | null
          current_location: string | null
          custodian: string | null
          department: string | null
          equipment_type: string
          gauge_drawings: Json | null
          gauge_id: string
          id: string
          image_url: string | null
          instrument_type: string | null
          latest_msa_date: string | null
          location: string | null
          manufacturer: string | null
          manufacturer_website: string | null
          master_calibration_date: string | null
          master_certificate_no: string | null
          master_certificates: Json | null
          master_expiry_date: string | null
          master_id: string | null
          master_nabl_certificates: Json | null
          master_name: string | null
          master_validity_period: number | null
          master_validity_unit: string | null
          measurement_range: string | null
          measurement_types: string[] | null
          model_number: string | null
          msa_frequency: number | null
          msa_frequency_unit: string | null
          msa_study_types: Json | null
          name: string
          next_calibration_due: string | null
          next_msa_due: string | null
          notes: string | null
          notification_list: string[] | null
          org_id: string | null
          purchase_date: string | null
          purchase_price: number | null
          rack_number: string | null
          range_or_size: string | null
          received_date: string | null
          reference_standard: string | null
          resolution: string | null
          serial_number: string
          shelf_number: string | null
          source_vendor: string | null
          spec_reference_standard: string | null
          status: string
          storage_location: string | null
          type: string
          units_of_measurement: string | null
          user_manual: string | null
          warranty: string | null
          warranty_period: string | null
        }
        Insert: {
          accuracy?: string | null
          area?: string | null
          asset_number?: string | null
          assignee?: string | null
          calibrated_by?: string | null
          calibration_certificate_number?: string | null
          calibration_cycles?: number | null
          calibration_date?: string | null
          calibration_days?: number | null
          calibration_interval?: string | null
          calibration_months?: number | null
          calibration_procedure?: string | null
          calibration_years?: number | null
          category?: string | null
          condition?: string | null
          control_number: string
          created_by_user_role_id?: string | null
          created_date?: string | null
          current_location?: string | null
          custodian?: string | null
          department?: string | null
          equipment_type?: string
          gauge_drawings?: Json | null
          gauge_id?: string
          id?: string
          image_url?: string | null
          instrument_type?: string | null
          latest_msa_date?: string | null
          location?: string | null
          manufacturer?: string | null
          manufacturer_website?: string | null
          master_calibration_date?: string | null
          master_certificate_no?: string | null
          master_certificates?: Json | null
          master_expiry_date?: string | null
          master_id?: string | null
          master_nabl_certificates?: Json | null
          master_name?: string | null
          master_validity_period?: number | null
          master_validity_unit?: string | null
          measurement_range?: string | null
          measurement_types?: string[] | null
          model_number?: string | null
          msa_frequency?: number | null
          msa_frequency_unit?: string | null
          msa_study_types?: Json | null
          name: string
          next_calibration_due?: string | null
          next_msa_due?: string | null
          notes?: string | null
          notification_list?: string[] | null
          org_id?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          rack_number?: string | null
          range_or_size?: string | null
          received_date?: string | null
          reference_standard?: string | null
          resolution?: string | null
          serial_number: string
          shelf_number?: string | null
          source_vendor?: string | null
          spec_reference_standard?: string | null
          status: string
          storage_location?: string | null
          type: string
          units_of_measurement?: string | null
          user_manual?: string | null
          warranty?: string | null
          warranty_period?: string | null
        }
        Update: {
          accuracy?: string | null
          area?: string | null
          asset_number?: string | null
          assignee?: string | null
          calibrated_by?: string | null
          calibration_certificate_number?: string | null
          calibration_cycles?: number | null
          calibration_date?: string | null
          calibration_days?: number | null
          calibration_interval?: string | null
          calibration_months?: number | null
          calibration_procedure?: string | null
          calibration_years?: number | null
          category?: string | null
          condition?: string | null
          control_number?: string
          created_by_user_role_id?: string | null
          created_date?: string | null
          current_location?: string | null
          custodian?: string | null
          department?: string | null
          equipment_type?: string
          gauge_drawings?: Json | null
          gauge_id?: string
          id?: string
          image_url?: string | null
          instrument_type?: string | null
          latest_msa_date?: string | null
          location?: string | null
          manufacturer?: string | null
          manufacturer_website?: string | null
          master_calibration_date?: string | null
          master_certificate_no?: string | null
          master_certificates?: Json | null
          master_expiry_date?: string | null
          master_id?: string | null
          master_nabl_certificates?: Json | null
          master_name?: string | null
          master_validity_period?: number | null
          master_validity_unit?: string | null
          measurement_range?: string | null
          measurement_types?: string[] | null
          model_number?: string | null
          msa_frequency?: number | null
          msa_frequency_unit?: string | null
          msa_study_types?: Json | null
          name?: string
          next_calibration_due?: string | null
          next_msa_due?: string | null
          notes?: string | null
          notification_list?: string[] | null
          org_id?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          rack_number?: string | null
          range_or_size?: string | null
          received_date?: string | null
          reference_standard?: string | null
          resolution?: string | null
          serial_number?: string
          shelf_number?: string | null
          source_vendor?: string | null
          spec_reference_standard?: string | null
          status?: string
          storage_location?: string | null
          type?: string
          units_of_measurement?: string | null
          user_manual?: string | null
          warranty?: string | null
          warranty_period?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gauges_created_by_user_role_id_fkey"
            columns: ["created_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gauges_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      goods_receipt_notes: {
        Row: {
          acceptance_remarks: string | null
          contact_person: string
          created_at: string
          created_by: string | null
          created_by_department: string | null
          created_by_name: string | null
          created_by_role: string | null
          created_by_user_role_id: string | null
          date: string
          department: string
          document_no: string
          final_status: string | null
          gauge_ids: Json | null
          grn_created_by: string
          grn_id: string | null
          id: string
          inspection_data: Json | null
          inspection_status: string | null
          inspection_team_date: string | null
          inspection_team_name: string | null
          inspection_team_signature: string | null
          invoice_no: string
          masters_data: Json | null
          masters_files: Json | null
          org_id: string | null
          purchase_order_no: string
          shipped_date: string | null
          supplier_code: string
          supplier_name: string
          updated_at: string
          updated_by_name: string | null
          updated_by_role: string | null
          updated_by_user_role_id: string | null
        }
        Insert: {
          acceptance_remarks?: string | null
          contact_person: string
          created_at?: string
          created_by?: string | null
          created_by_department?: string | null
          created_by_name?: string | null
          created_by_role?: string | null
          created_by_user_role_id?: string | null
          date: string
          department: string
          document_no: string
          final_status?: string | null
          gauge_ids?: Json | null
          grn_created_by: string
          grn_id?: string | null
          id?: string
          inspection_data?: Json | null
          inspection_status?: string | null
          inspection_team_date?: string | null
          inspection_team_name?: string | null
          inspection_team_signature?: string | null
          invoice_no: string
          masters_data?: Json | null
          masters_files?: Json | null
          org_id?: string | null
          purchase_order_no: string
          shipped_date?: string | null
          supplier_code: string
          supplier_name: string
          updated_at?: string
          updated_by_name?: string | null
          updated_by_role?: string | null
          updated_by_user_role_id?: string | null
        }
        Update: {
          acceptance_remarks?: string | null
          contact_person?: string
          created_at?: string
          created_by?: string | null
          created_by_department?: string | null
          created_by_name?: string | null
          created_by_role?: string | null
          created_by_user_role_id?: string | null
          date?: string
          department?: string
          document_no?: string
          final_status?: string | null
          gauge_ids?: Json | null
          grn_created_by?: string
          grn_id?: string | null
          id?: string
          inspection_data?: Json | null
          inspection_status?: string | null
          inspection_team_date?: string | null
          inspection_team_name?: string | null
          inspection_team_signature?: string | null
          invoice_no?: string
          masters_data?: Json | null
          masters_files?: Json | null
          org_id?: string | null
          purchase_order_no?: string
          shipped_date?: string | null
          supplier_code?: string
          supplier_name?: string
          updated_at?: string
          updated_by_name?: string | null
          updated_by_role?: string | null
          updated_by_user_role_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_goods_receipt_notes_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goods_receipt_notes_created_by_user_role_id_fkey"
            columns: ["created_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goods_receipt_notes_updated_by_user_role_id_fkey"
            columns: ["updated_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      grn_inspection_approval_transactions: {
        Row: {
          action_type: string
          created_at: string
          details: Json | null
          grn_inspection_approval_id: string
          id: string
          metadata: Json | null
          org_id: string | null
          performed_by: string | null
          performed_by_name: string | null
          timestamp: string
        }
        Insert: {
          action_type: string
          created_at?: string
          details?: Json | null
          grn_inspection_approval_id: string
          id?: string
          metadata?: Json | null
          org_id?: string | null
          performed_by?: string | null
          performed_by_name?: string | null
          timestamp?: string
        }
        Update: {
          action_type?: string
          created_at?: string
          details?: Json | null
          grn_inspection_approval_id?: string
          id?: string
          metadata?: Json | null
          org_id?: string | null
          performed_by?: string | null
          performed_by_name?: string | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_grn_inspection_approval_transactions_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grn_inspection_approval_transac_grn_inspection_approval_id_fkey"
            columns: ["grn_inspection_approval_id"]
            isOneToOne: false
            referencedRelation: "grn_inspection_approvals"
            referencedColumns: ["id"]
          },
        ]
      }
      grn_inspection_approvals: {
        Row: {
          approval_notes: string | null
          approved_at: string | null
          approved_by: string | null
          approved_by_user_role_id: string | null
          created_at: string
          document_no: string
          grn_id: string
          id: string
          inspected_by: string
          inspection_data: Json
          org_id: string | null
          rejected_at: string | null
          rejected_by: string | null
          rejected_by_user_role_id: string | null
          rejection_reason: string | null
          status: string
          submitted_at: string
          supplier_name: string
          updated_at: string
        }
        Insert: {
          approval_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          approved_by_user_role_id?: string | null
          created_at?: string
          document_no: string
          grn_id: string
          id?: string
          inspected_by: string
          inspection_data: Json
          org_id?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejected_by_user_role_id?: string | null
          rejection_reason?: string | null
          status?: string
          submitted_at?: string
          supplier_name: string
          updated_at?: string
        }
        Update: {
          approval_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          approved_by_user_role_id?: string | null
          created_at?: string
          document_no?: string
          grn_id?: string
          id?: string
          inspected_by?: string
          inspection_data?: Json
          org_id?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejected_by_user_role_id?: string | null
          rejection_reason?: string | null
          status?: string
          submitted_at?: string
          supplier_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_grn_inspection_approvals_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grn_inspection_approvals_approved_by_user_role_id_fkey"
            columns: ["approved_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grn_inspection_approvals_grn_id_fkey"
            columns: ["grn_id"]
            isOneToOne: false
            referencedRelation: "goods_receipt_notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grn_inspection_approvals_rejected_by_user_role_id_fkey"
            columns: ["rejected_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      grn_inspection_logs: {
        Row: {
          created_at: string | null
          document_no: string
          final_status: string | null
          grn_id: string | null
          id: string
          inspected_by: string
          inspection_date: string | null
          inspection_status: string
          org_id: string | null
          remarks: string | null
          supplier_name: string
        }
        Insert: {
          created_at?: string | null
          document_no: string
          final_status?: string | null
          grn_id?: string | null
          id?: string
          inspected_by: string
          inspection_date?: string | null
          inspection_status: string
          org_id?: string | null
          remarks?: string | null
          supplier_name: string
        }
        Update: {
          created_at?: string | null
          document_no?: string
          final_status?: string | null
          grn_id?: string | null
          id?: string
          inspected_by?: string
          inspection_date?: string | null
          inspection_status?: string
          org_id?: string | null
          remarks?: string | null
          supplier_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_grn_inspection_logs_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grn_inspection_logs_grn_id_fkey"
            columns: ["grn_id"]
            isOneToOne: false
            referencedRelation: "goods_receipt_notes"
            referencedColumns: ["id"]
          },
        ]
      }
      grn_inspections: {
        Row: {
          compliance: string | null
          created_at: string | null
          description: string | null
          grn_id: string | null
          id: string
          inspected_by: string
          inspection_date: string | null
          inspection_remarks: string | null
          org_id: string | null
          quantity_received: string | null
          uom: string | null
          updated_at: string | null
        }
        Insert: {
          compliance?: string | null
          created_at?: string | null
          description?: string | null
          grn_id?: string | null
          id?: string
          inspected_by: string
          inspection_date?: string | null
          inspection_remarks?: string | null
          org_id?: string | null
          quantity_received?: string | null
          uom?: string | null
          updated_at?: string | null
        }
        Update: {
          compliance?: string | null
          created_at?: string | null
          description?: string | null
          grn_id?: string | null
          id?: string
          inspected_by?: string
          inspection_date?: string | null
          inspection_remarks?: string | null
          org_id?: string | null
          quantity_received?: string | null
          uom?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grn_inspections_grn_id_fkey"
            columns: ["grn_id"]
            isOneToOne: false
            referencedRelation: "goods_receipt_notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grn_inspections_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      inspection_data_records: {
        Row: {
          created_at: string | null
          id: string
          inspection_id: string
          inspection_type: string
          is_within_tolerance: boolean | null
          max_tolerance: number | null
          measurement_name: string
          measurement_value: string | null
          min_tolerance: number | null
          nominal_value: number | null
          org_id: string | null
          uom: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          inspection_id: string
          inspection_type: string
          is_within_tolerance?: boolean | null
          max_tolerance?: number | null
          measurement_name: string
          measurement_value?: string | null
          min_tolerance?: number | null
          nominal_value?: number | null
          org_id?: string | null
          uom?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          inspection_id?: string
          inspection_type?: string
          is_within_tolerance?: boolean | null
          max_tolerance?: number | null
          measurement_name?: string
          measurement_value?: string | null
          min_tolerance?: number | null
          nominal_value?: number | null
          org_id?: string | null
          uom?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_inspection_data_records_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      inspection_vernier_micrometer: {
        Row: {
          area_clean: boolean | null
          auth_user_id: string | null
          batch_lot_number: string | null
          correct_technique: boolean | null
          created_at: string | null
          drawing_number: string | null
          id: string
          inspection_date: string
          inspection_result: string
          instrument_calibrated: boolean | null
          instrument_stored: boolean | null
          least_count: number | null
          machine_workstation: string | null
          measuring_instrument: string
          multiple_readings: boolean | null
          ncr_report_number: string | null
          notes: string | null
          operator_name: string
          org_id: string | null
          part_clean: boolean | null
          part_name: string | null
          part_number: string | null
          results_recorded: boolean | null
          shift: string
          supervisor_signature: string | null
          updated_at: string | null
          zero_error_checked: boolean | null
        }
        Insert: {
          area_clean?: boolean | null
          auth_user_id?: string | null
          batch_lot_number?: string | null
          correct_technique?: boolean | null
          created_at?: string | null
          drawing_number?: string | null
          id?: string
          inspection_date: string
          inspection_result: string
          instrument_calibrated?: boolean | null
          instrument_stored?: boolean | null
          least_count?: number | null
          machine_workstation?: string | null
          measuring_instrument: string
          multiple_readings?: boolean | null
          ncr_report_number?: string | null
          notes?: string | null
          operator_name: string
          org_id?: string | null
          part_clean?: boolean | null
          part_name?: string | null
          part_number?: string | null
          results_recorded?: boolean | null
          shift: string
          supervisor_signature?: string | null
          updated_at?: string | null
          zero_error_checked?: boolean | null
        }
        Update: {
          area_clean?: boolean | null
          auth_user_id?: string | null
          batch_lot_number?: string | null
          correct_technique?: boolean | null
          created_at?: string | null
          drawing_number?: string | null
          id?: string
          inspection_date?: string
          inspection_result?: string
          instrument_calibrated?: boolean | null
          instrument_stored?: boolean | null
          least_count?: number | null
          machine_workstation?: string | null
          measuring_instrument?: string
          multiple_readings?: boolean | null
          ncr_report_number?: string | null
          notes?: string | null
          operator_name?: string
          org_id?: string | null
          part_clean?: boolean | null
          part_name?: string | null
          part_number?: string | null
          results_recorded?: boolean | null
          shift?: string
          supervisor_signature?: string | null
          updated_at?: string | null
          zero_error_checked?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_inspection_vernier_micrometer_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      instruments_equipment_approval_requests: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          approved_by_user_role_id: string | null
          archived_at: string | null
          created_at: string
          id: string
          instruments_equipment_request_id: string
          is_active: boolean | null
          org_id: string | null
          parent_approval_id: string | null
          rejected_at: string | null
          rejected_by_user_role_id: string | null
          rejection_reason: string | null
          requested_at: string
          status: string
          updated_at: string
          version: number | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          approved_by_user_role_id?: string | null
          archived_at?: string | null
          created_at?: string
          id?: string
          instruments_equipment_request_id: string
          is_active?: boolean | null
          org_id?: string | null
          parent_approval_id?: string | null
          rejected_at?: string | null
          rejected_by_user_role_id?: string | null
          rejection_reason?: string | null
          requested_at?: string
          status?: string
          updated_at?: string
          version?: number | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          approved_by_user_role_id?: string | null
          archived_at?: string | null
          created_at?: string
          id?: string
          instruments_equipment_request_id?: string
          is_active?: boolean | null
          org_id?: string | null
          parent_approval_id?: string | null
          rejected_at?: string | null
          rejected_by_user_role_id?: string | null
          rejection_reason?: string | null
          requested_at?: string
          status?: string
          updated_at?: string
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_instruments_equipment_request"
            columns: ["instruments_equipment_request_id"]
            isOneToOne: false
            referencedRelation: "instruments_equipment_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_parent_approval"
            columns: ["parent_approval_id"]
            isOneToOne: false
            referencedRelation: "instruments_equipment_approval_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instruments_equipment_approval_re_approved_by_user_role_id_fkey"
            columns: ["approved_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instruments_equipment_approval_re_rejected_by_user_role_id_fkey"
            columns: ["rejected_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instruments_equipment_approval_requests_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      instruments_equipment_approval_transactions: {
        Row: {
          action_type: string
          approval_request_id: string | null
          created_at: string
          details: Json | null
          id: string
          instruments_equipment_request_id: string
          metadata: Json | null
          org_id: string | null
          performed_by: string | null
          performed_by_name: string | null
          timestamp: string
          transaction_id: string
        }
        Insert: {
          action_type: string
          approval_request_id?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          instruments_equipment_request_id: string
          metadata?: Json | null
          org_id?: string | null
          performed_by?: string | null
          performed_by_name?: string | null
          timestamp?: string
          transaction_id?: string
        }
        Update: {
          action_type?: string
          approval_request_id?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          instruments_equipment_request_id?: string
          metadata?: Json | null
          org_id?: string | null
          performed_by?: string | null
          performed_by_name?: string | null
          timestamp?: string
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_approval_request_trans"
            columns: ["approval_request_id"]
            isOneToOne: false
            referencedRelation: "instruments_equipment_approval_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_instruments_equipment_request_trans"
            columns: ["instruments_equipment_request_id"]
            isOneToOne: false
            referencedRelation: "instruments_equipment_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instruments_equipment_approval_transactions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      instruments_equipment_request_drafts: {
        Row: {
          created_at: string
          draft_name: string
          form_data: Json
          id: string
          org_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          draft_name: string
          form_data?: Json
          id?: string
          org_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          draft_name?: string
          form_data?: Json
          id?: string
          org_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_instruments_equipment_request_drafts_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      instruments_equipment_requests: {
        Row: {
          admin_approval_status: string | null
          approval_date: string | null
          approval_status: string
          approved_by: string | null
          area: string
          attachments: string | null
          auto_generated_id: string | null
          calibration_required: boolean | null
          created_at: string
          created_by: string | null
          created_by_contact_number: string | null
          created_by_department: string | null
          created_by_name: string | null
          created_by_role: string | null
          created_by_user_role_id: string | null
          date_of_request: string
          department: string
          equipment_type: string
          estimated_cost_per_unit: number | null
          id: string
          instrument_equipment_name: string
          is_customer_request: boolean
          least_count: string | null
          model_brand: string | null
          notes: string | null
          org_id: string | null
          pdf_attachment_url: string | null
          plant_shop: string
          project_name: string
          proposed_vendors: string | null
          purpose_of_procurement: string
          quantity_required: number
          rejection_reason: string | null
          remarks_justification: string | null
          request_number: string
          requested_by: string
          select_item: string
          specification_range: string | null
          status: string
          technical_document_urls: Json | null
          total_estimated_cost: number | null
          type: string | null
          unit_of_measurements: string | null
          updated_at: string
          updated_by_name: string | null
          updated_by_role: string | null
          updated_by_user_role_id: string | null
        }
        Insert: {
          admin_approval_status?: string | null
          approval_date?: string | null
          approval_status?: string
          approved_by?: string | null
          area: string
          attachments?: string | null
          auto_generated_id?: string | null
          calibration_required?: boolean | null
          created_at?: string
          created_by?: string | null
          created_by_contact_number?: string | null
          created_by_department?: string | null
          created_by_name?: string | null
          created_by_role?: string | null
          created_by_user_role_id?: string | null
          date_of_request?: string
          department: string
          equipment_type: string
          estimated_cost_per_unit?: number | null
          id?: string
          instrument_equipment_name: string
          is_customer_request?: boolean
          least_count?: string | null
          model_brand?: string | null
          notes?: string | null
          org_id?: string | null
          pdf_attachment_url?: string | null
          plant_shop: string
          project_name: string
          proposed_vendors?: string | null
          purpose_of_procurement: string
          quantity_required?: number
          rejection_reason?: string | null
          remarks_justification?: string | null
          request_number: string
          requested_by: string
          select_item: string
          specification_range?: string | null
          status?: string
          technical_document_urls?: Json | null
          total_estimated_cost?: number | null
          type?: string | null
          unit_of_measurements?: string | null
          updated_at?: string
          updated_by_name?: string | null
          updated_by_role?: string | null
          updated_by_user_role_id?: string | null
        }
        Update: {
          admin_approval_status?: string | null
          approval_date?: string | null
          approval_status?: string
          approved_by?: string | null
          area?: string
          attachments?: string | null
          auto_generated_id?: string | null
          calibration_required?: boolean | null
          created_at?: string
          created_by?: string | null
          created_by_contact_number?: string | null
          created_by_department?: string | null
          created_by_name?: string | null
          created_by_role?: string | null
          created_by_user_role_id?: string | null
          date_of_request?: string
          department?: string
          equipment_type?: string
          estimated_cost_per_unit?: number | null
          id?: string
          instrument_equipment_name?: string
          is_customer_request?: boolean
          least_count?: string | null
          model_brand?: string | null
          notes?: string | null
          org_id?: string | null
          pdf_attachment_url?: string | null
          plant_shop?: string
          project_name?: string
          proposed_vendors?: string | null
          purpose_of_procurement?: string
          quantity_required?: number
          rejection_reason?: string | null
          remarks_justification?: string | null
          request_number?: string
          requested_by?: string
          select_item?: string
          specification_range?: string | null
          status?: string
          technical_document_urls?: Json | null
          total_estimated_cost?: number | null
          type?: string | null
          unit_of_measurements?: string | null
          updated_at?: string
          updated_by_name?: string | null
          updated_by_role?: string | null
          updated_by_user_role_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_instruments_equipment_requests_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instruments_equipment_requests_created_by_user_role_id_fkey"
            columns: ["created_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instruments_equipment_requests_updated_by_user_role_id_fkey"
            columns: ["updated_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      linearity_analysis_drafts: {
        Row: {
          created_at: string
          draft_name: string
          form_data: Json
          id: string
          measurements: Json
          org_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          draft_name: string
          form_data?: Json
          id?: string
          measurements?: Json
          org_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          draft_name?: string
          form_data?: Json
          id?: string
          measurements?: Json
          org_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_linearity_analysis_drafts_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      linearity_analysis_logs: {
        Row: {
          calculated_results: Json | null
          conducted_by: string
          created_at: string
          data_entry_timestamp: string | null
          id: string
          instrument_number: string
          measurements: Json
          num_trials: number
          org_id: string | null
          parameter: string
          part_reference_values: Json
          performed_by_user_role_id: string | null
          pp_target: number | null
          selected_gauge: Json | null
          sigma_process_var: number | null
          specification_limits: Json
          status: string
          study_date: string
          study_name: string
          units: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          calculated_results?: Json | null
          conducted_by: string
          created_at?: string
          data_entry_timestamp?: string | null
          id?: string
          instrument_number: string
          measurements?: Json
          num_trials?: number
          org_id?: string | null
          parameter: string
          part_reference_values?: Json
          performed_by_user_role_id?: string | null
          pp_target?: number | null
          selected_gauge?: Json | null
          sigma_process_var?: number | null
          specification_limits?: Json
          status?: string
          study_date: string
          study_name: string
          units?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          calculated_results?: Json | null
          conducted_by?: string
          created_at?: string
          data_entry_timestamp?: string | null
          id?: string
          instrument_number?: string
          measurements?: Json
          num_trials?: number
          org_id?: string | null
          parameter?: string
          part_reference_values?: Json
          performed_by_user_role_id?: string | null
          pp_target?: number | null
          selected_gauge?: Json | null
          sigma_process_var?: number | null
          specification_limits?: Json
          status?: string
          study_date?: string
          study_name?: string
          units?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_linearity_analysis_logs_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_linearity_analysis_logs_performed_by_user_role"
            columns: ["performed_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      linearity_analysis_results: {
        Row: {
          average_bias_by_part: number | null
          confidence_limits_lower: number | null
          confidence_limits_upper: number | null
          created_at: string
          degrees_of_freedom: number
          id: string
          intercept: number
          is_bias_acceptable: boolean | null
          is_linearity_acceptable: boolean | null
          org_id: string | null
          part_data: Json
          r_squared: number
          se_percent_tolerance: number | null
          se_percent_total_var: number | null
          slope: number
          standard_error: number
          study_id: string
          t_statistic_intercept: number | null
          t_statistic_slope: number | null
          tolerance: number
        }
        Insert: {
          average_bias_by_part?: number | null
          confidence_limits_lower?: number | null
          confidence_limits_upper?: number | null
          created_at?: string
          degrees_of_freedom: number
          id?: string
          intercept: number
          is_bias_acceptable?: boolean | null
          is_linearity_acceptable?: boolean | null
          org_id?: string | null
          part_data?: Json
          r_squared: number
          se_percent_tolerance?: number | null
          se_percent_total_var?: number | null
          slope: number
          standard_error: number
          study_id: string
          t_statistic_intercept?: number | null
          t_statistic_slope?: number | null
          tolerance: number
        }
        Update: {
          average_bias_by_part?: number | null
          confidence_limits_lower?: number | null
          confidence_limits_upper?: number | null
          created_at?: string
          degrees_of_freedom?: number
          id?: string
          intercept?: number
          is_bias_acceptable?: boolean | null
          is_linearity_acceptable?: boolean | null
          org_id?: string | null
          part_data?: Json
          r_squared?: number
          se_percent_tolerance?: number | null
          se_percent_total_var?: number | null
          slope?: number
          standard_error?: number
          study_id?: string
          t_statistic_intercept?: number | null
          t_statistic_slope?: number | null
          tolerance?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_linearity_analysis_results_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "linearity_analysis_results_study_id_fkey"
            columns: ["study_id"]
            isOneToOne: false
            referencedRelation: "linearity_analysis_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      linearity_measurements: {
        Row: {
          bias: number
          created_at: string
          id: string
          measured_value: number
          org_id: string | null
          part_index: number
          reference_value: number
          study_id: string
          trial_number: number
        }
        Insert: {
          bias: number
          created_at?: string
          id?: string
          measured_value: number
          org_id?: string | null
          part_index: number
          reference_value: number
          study_id: string
          trial_number: number
        }
        Update: {
          bias?: number
          created_at?: string
          id?: string
          measured_value?: number
          org_id?: string | null
          part_index?: number
          reference_value?: number
          study_id?: string
          trial_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_linearity_measurements_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "linearity_measurements_study_id_fkey"
            columns: ["study_id"]
            isOneToOne: false
            referencedRelation: "linearity_analysis_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_records: {
        Row: {
          cost: number | null
          created_at: string | null
          date: string | null
          description: string | null
          gauge_id: string | null
          id: string
          org_id: string | null
          performed_by: string | null
          updated_at: string | null
        }
        Insert: {
          cost?: number | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          gauge_id?: string | null
          id?: string
          org_id?: string | null
          performed_by?: string | null
          updated_at?: string | null
        }
        Update: {
          cost?: number | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          gauge_id?: string | null
          id?: string
          org_id?: string | null
          performed_by?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_maintenance_records_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_records_gauge_id_fkey"
            columns: ["gauge_id"]
            isOneToOne: false
            referencedRelation: "gauges"
            referencedColumns: ["id"]
          },
        ]
      }
      module_permissions: {
        Row: {
          can_create: boolean | null
          can_delete: boolean | null
          can_edit: boolean | null
          can_view: boolean | null
          created_at: string | null
          id: string
          module_name: string
          org_id: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          can_create?: boolean | null
          can_delete?: boolean | null
          can_edit?: boolean | null
          can_view?: boolean | null
          created_at?: string | null
          id?: string
          module_name: string
          org_id?: string | null
          role: string
          updated_at?: string | null
        }
        Update: {
          can_create?: boolean | null
          can_delete?: boolean | null
          can_edit?: boolean | null
          can_view?: boolean | null
          created_at?: string | null
          id?: string
          module_name?: string
          org_id?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_module_permissions_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      msa_data: {
        Row: {
          appraisers: number | null
          characteristic: string
          created_at: string | null
          created_by: string | null
          data: Json | null
          id: string
          instrument_id: string | null
          org_id: string | null
          part_number: string
          parts: number | null
          results: Json | null
          study_date: string
          study_name: string
          study_type: string
          tolerance: number | null
          trials: number | null
          updated_at: string | null
        }
        Insert: {
          appraisers?: number | null
          characteristic: string
          created_at?: string | null
          created_by?: string | null
          data?: Json | null
          id?: string
          instrument_id?: string | null
          org_id?: string | null
          part_number: string
          parts?: number | null
          results?: Json | null
          study_date?: string
          study_name: string
          study_type: string
          tolerance?: number | null
          trials?: number | null
          updated_at?: string | null
        }
        Update: {
          appraisers?: number | null
          characteristic?: string
          created_at?: string | null
          created_by?: string | null
          data?: Json | null
          id?: string
          instrument_id?: string | null
          org_id?: string | null
          part_number?: string
          parts?: number | null
          results?: Json | null
          study_date?: string
          study_name?: string
          study_type?: string
          tolerance?: number | null
          trials?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_msa_data_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_areas: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          org_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          org_id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          org_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      organization_departments: {
        Row: {
          created_at: string | null
          department_head: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          org_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department_head?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          org_id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department_head?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          org_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      organization_locations: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string
          geo_location: string | null
          id: string
          is_active: boolean
          name: string
          org_id: string
          postal_code: string | null
          state: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          geo_location?: string | null
          id?: string
          is_active?: boolean
          name: string
          org_id: string
          postal_code?: string | null
          state?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          geo_location?: string | null
          id?: string
          is_active?: boolean
          name?: string
          org_id?: string
          postal_code?: string | null
          state?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      organization_profiles: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string
          created_by: string | null
          description: string | null
          email: string | null
          employee_count: number | null
          established_date: string | null
          id: string
          industry: string | null
          logo_file_size: number | null
          logo_filename: string | null
          logo_url: string | null
          msa_settings: Json | null
          name: string
          org_id: string | null
          phone: string | null
          postal_code: string | null
          singleton_check: boolean | null
          state: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          email?: string | null
          employee_count?: number | null
          established_date?: string | null
          id?: string
          industry?: string | null
          logo_file_size?: number | null
          logo_filename?: string | null
          logo_url?: string | null
          msa_settings?: Json | null
          name: string
          org_id?: string | null
          phone?: string | null
          postal_code?: string | null
          singleton_check?: boolean | null
          state?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          email?: string | null
          employee_count?: number | null
          established_date?: string | null
          id?: string
          industry?: string | null
          logo_file_size?: number | null
          logo_filename?: string | null
          logo_url?: string | null
          msa_settings?: Json | null
          name?: string
          org_id?: string | null
          phone?: string | null
          postal_code?: string | null
          singleton_check?: boolean | null
          state?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_profiles_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      password_reset_tokens: {
        Row: {
          created_at: string
          email: string
          expires_at: string
          id: string
          org_id: string | null
          reset_token: string
          used_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          expires_at: string
          id?: string
          org_id?: string | null
          reset_token: string
          used_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          org_id?: string | null
          reset_token?: string
          used_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      permissions: {
        Row: {
          action: string
          created_at: string
          description: string | null
          id: string
          module: string
          name: string
          org_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          description?: string | null
          id?: string
          module: string
          name: string
          org_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          description?: string | null
          id?: string
          module?: string
          name?: string
          org_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "permissions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_order_alerts: {
        Row: {
          alert_type: string
          created_at: string | null
          due_date: string | null
          id: string
          message: string
          org_id: string | null
          purchase_order_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          alert_type: string
          created_at?: string | null
          due_date?: string | null
          id?: string
          message: string
          org_id?: string | null
          purchase_order_id: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          alert_type?: string
          created_at?: string | null
          due_date?: string | null
          id?: string
          message?: string
          org_id?: string | null
          purchase_order_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_purchase_order_alerts_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_alerts_purchase_order_id_fkey"
            columns: ["purchase_order_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_order_items: {
        Row: {
          created_at: string | null
          delivery_date: string | null
          description: string
          gauge_type: string | null
          id: string
          is_received: boolean | null
          org_id: string | null
          part_number: string | null
          purchase_order_id: string
          quantity: number
          received_quantity: number | null
          specifications: string | null
          status: string | null
          total_price: number
          unit_of_measure: string | null
          unit_price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          delivery_date?: string | null
          description: string
          gauge_type?: string | null
          id?: string
          is_received?: boolean | null
          org_id?: string | null
          part_number?: string | null
          purchase_order_id: string
          quantity: number
          received_quantity?: number | null
          specifications?: string | null
          status?: string | null
          total_price: number
          unit_of_measure?: string | null
          unit_price: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          delivery_date?: string | null
          description?: string
          gauge_type?: string | null
          id?: string
          is_received?: boolean | null
          org_id?: string | null
          part_number?: string | null
          purchase_order_id?: string
          quantity?: number
          received_quantity?: number | null
          specifications?: string | null
          status?: string | null
          total_price?: number
          unit_of_measure?: string | null
          unit_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_purchase_order_items_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_purchase_order_id_fkey"
            columns: ["purchase_order_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_orders: {
        Row: {
          approved_by: string | null
          contact_email: string | null
          contact_person: string | null
          contact_phone: string | null
          currency: string | null
          delivery_address: string | null
          expected_delivery_date: string | null
          id: string
          issue_date: string | null
          notes: string | null
          org_id: string | null
          payment_terms: string | null
          po_date: string | null
          po_number: string
          po_number_display: string | null
          prepared_by: string | null
          purchase_request_id: string | null
          quotation_id: string | null
          shipping_terms: string | null
          special_instructions: string | null
          status: string | null
          supplier_id: string | null
          supplier_name: string | null
          total_amount: number | null
          user_id: string | null
          vendor_id: string | null
          warranty: string | null
        }
        Insert: {
          approved_by?: string | null
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          currency?: string | null
          delivery_address?: string | null
          expected_delivery_date?: string | null
          id?: string
          issue_date?: string | null
          notes?: string | null
          org_id?: string | null
          payment_terms?: string | null
          po_date?: string | null
          po_number: string
          po_number_display?: string | null
          prepared_by?: string | null
          purchase_request_id?: string | null
          quotation_id?: string | null
          shipping_terms?: string | null
          special_instructions?: string | null
          status?: string | null
          supplier_id?: string | null
          supplier_name?: string | null
          total_amount?: number | null
          user_id?: string | null
          vendor_id?: string | null
          warranty?: string | null
        }
        Update: {
          approved_by?: string | null
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          currency?: string | null
          delivery_address?: string | null
          expected_delivery_date?: string | null
          id?: string
          issue_date?: string | null
          notes?: string | null
          org_id?: string | null
          payment_terms?: string | null
          po_date?: string | null
          po_number?: string
          po_number_display?: string | null
          prepared_by?: string | null
          purchase_request_id?: string | null
          quotation_id?: string | null
          shipping_terms?: string | null
          special_instructions?: string | null
          status?: string | null
          supplier_id?: string | null
          supplier_name?: string | null
          total_amount?: number | null
          user_id?: string | null
          vendor_id?: string | null
          warranty?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_purchase_orders_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_quotation_id_fkey"
            columns: ["quotation_id"]
            isOneToOne: false
            referencedRelation: "quotations"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_request_drafts: {
        Row: {
          created_at: string | null
          draft_name: string
          form_data: Json
          id: string
          org_id: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          draft_name: string
          form_data: Json
          id?: string
          org_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          draft_name?: string
          form_data?: Json
          id?: string
          org_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_purchase_request_drafts_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_requests: {
        Row: {
          admin_approval_status: string | null
          approval_date: string | null
          approval_status: string | null
          approved_by: string | null
          automated_measurement_compatibility: boolean | null
          calibration_certificate: string | null
          chamfer_requirements: string | null
          coating_requirement: string | null
          component_name: string | null
          cost_lead_time_negotiation: boolean | null
          created_at: string | null
          created_by_contact_number: string | null
          created_by_department: string | null
          created_by_name: string | null
          created_by_role: string | null
          created_by_user_role_id: string | null
          delivery_deadline: string | null
          department: string
          form_data: Json | null
          form_schema_version: number | null
          gauge_class: string | null
          gauge_material: string | null
          gauge_standard: string | null
          gauge_sub_type: string | null
          gauge_type: string | null
          gauge_wear_life_expectancy: string | null
          go_no_go_requirement: string | null
          grr_study: boolean | null
          hardness_requirement: string | null
          id: string
          interchangeability_verification: boolean | null
          is_customer_request: boolean | null
          justification: string | null
          marking_identification: string | null
          measuring_range: string | null
          notes: string | null
          org_id: string | null
          priority: string
          project_name: string | null
          purpose: string | null
          quantity: number
          quantity_required: number | null
          rejection_date: string | null
          request_date: string | null
          request_number: string | null
          request_type: string
          requestor: string
          requestor_email: string | null
          resolution: string | null
          sent_to_procurement: boolean | null
          size_dimension: string | null
          specifications: Json | null
          storage_packaging: string | null
          supplier_ppap: boolean | null
          surface_finish: string | null
          technical_document_url: string | null
          technical_document_urls: string[] | null
          temperature_env_conditions: string | null
          thread_details: string | null
          tolerance_limits: string | null
          traceability_requirement: string | null
          unit_of_measurement: string | null
          updated_at: string | null
          workpiece_material: string | null
        }
        Insert: {
          admin_approval_status?: string | null
          approval_date?: string | null
          approval_status?: string | null
          approved_by?: string | null
          automated_measurement_compatibility?: boolean | null
          calibration_certificate?: string | null
          chamfer_requirements?: string | null
          coating_requirement?: string | null
          component_name?: string | null
          cost_lead_time_negotiation?: boolean | null
          created_at?: string | null
          created_by_contact_number?: string | null
          created_by_department?: string | null
          created_by_name?: string | null
          created_by_role?: string | null
          created_by_user_role_id?: string | null
          delivery_deadline?: string | null
          department: string
          form_data?: Json | null
          form_schema_version?: number | null
          gauge_class?: string | null
          gauge_material?: string | null
          gauge_standard?: string | null
          gauge_sub_type?: string | null
          gauge_type?: string | null
          gauge_wear_life_expectancy?: string | null
          go_no_go_requirement?: string | null
          grr_study?: boolean | null
          hardness_requirement?: string | null
          id?: string
          interchangeability_verification?: boolean | null
          is_customer_request?: boolean | null
          justification?: string | null
          marking_identification?: string | null
          measuring_range?: string | null
          notes?: string | null
          org_id?: string | null
          priority: string
          project_name?: string | null
          purpose?: string | null
          quantity: number
          quantity_required?: number | null
          rejection_date?: string | null
          request_date?: string | null
          request_number?: string | null
          request_type: string
          requestor: string
          requestor_email?: string | null
          resolution?: string | null
          sent_to_procurement?: boolean | null
          size_dimension?: string | null
          specifications?: Json | null
          storage_packaging?: string | null
          supplier_ppap?: boolean | null
          surface_finish?: string | null
          technical_document_url?: string | null
          technical_document_urls?: string[] | null
          temperature_env_conditions?: string | null
          thread_details?: string | null
          tolerance_limits?: string | null
          traceability_requirement?: string | null
          unit_of_measurement?: string | null
          updated_at?: string | null
          workpiece_material?: string | null
        }
        Update: {
          admin_approval_status?: string | null
          approval_date?: string | null
          approval_status?: string | null
          approved_by?: string | null
          automated_measurement_compatibility?: boolean | null
          calibration_certificate?: string | null
          chamfer_requirements?: string | null
          coating_requirement?: string | null
          component_name?: string | null
          cost_lead_time_negotiation?: boolean | null
          created_at?: string | null
          created_by_contact_number?: string | null
          created_by_department?: string | null
          created_by_name?: string | null
          created_by_role?: string | null
          created_by_user_role_id?: string | null
          delivery_deadline?: string | null
          department?: string
          form_data?: Json | null
          form_schema_version?: number | null
          gauge_class?: string | null
          gauge_material?: string | null
          gauge_standard?: string | null
          gauge_sub_type?: string | null
          gauge_type?: string | null
          gauge_wear_life_expectancy?: string | null
          go_no_go_requirement?: string | null
          grr_study?: boolean | null
          hardness_requirement?: string | null
          id?: string
          interchangeability_verification?: boolean | null
          is_customer_request?: boolean | null
          justification?: string | null
          marking_identification?: string | null
          measuring_range?: string | null
          notes?: string | null
          org_id?: string | null
          priority?: string
          project_name?: string | null
          purpose?: string | null
          quantity?: number
          quantity_required?: number | null
          rejection_date?: string | null
          request_date?: string | null
          request_number?: string | null
          request_type?: string
          requestor?: string
          requestor_email?: string | null
          resolution?: string | null
          sent_to_procurement?: boolean | null
          size_dimension?: string | null
          specifications?: Json | null
          storage_packaging?: string | null
          supplier_ppap?: boolean | null
          surface_finish?: string | null
          technical_document_url?: string | null
          technical_document_urls?: string[] | null
          temperature_env_conditions?: string | null
          thread_details?: string | null
          tolerance_limits?: string | null
          traceability_requirement?: string | null
          unit_of_measurement?: string | null
          updated_at?: string | null
          workpiece_material?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_purchase_requests_created_by_user_role"
            columns: ["created_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_purchase_requests_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_requests_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_returns: {
        Row: {
          account_no: string
          amount: string
          amount_in_words: string
          bank_name: string
          branch_name: string
          created_at: string
          debit_note_no: string
          discount: string | null
          id: string
          ifs_code: string
          igst: string
          invoice_date: string
          item_description: string
          org_id: string | null
          original_invoice_no: string
          other_references: string | null
          quantity: string
          rate: string
          return_date: string
          total_amount: string
          updated_at: string
          user_id: string
        }
        Insert: {
          account_no: string
          amount: string
          amount_in_words: string
          bank_name: string
          branch_name: string
          created_at?: string
          debit_note_no: string
          discount?: string | null
          id?: string
          ifs_code: string
          igst: string
          invoice_date: string
          item_description: string
          org_id?: string | null
          original_invoice_no: string
          other_references?: string | null
          quantity: string
          rate: string
          return_date: string
          total_amount: string
          updated_at?: string
          user_id: string
        }
        Update: {
          account_no?: string
          amount?: string
          amount_in_words?: string
          bank_name?: string
          branch_name?: string
          created_at?: string
          debit_note_no?: string
          discount?: string | null
          id?: string
          ifs_code?: string
          igst?: string
          invoice_date?: string
          item_description?: string
          org_id?: string | null
          original_invoice_no?: string
          other_references?: string | null
          quantity?: string
          rate?: string
          return_date?: string
          total_amount?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchase_returns_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      quotation_items: {
        Row: {
          created_at: string | null
          description: string
          id: string
          org_id: string | null
          quantity: number
          quotation_id: string
          total_price: number
          unit_price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          org_id?: string | null
          quantity: number
          quotation_id: string
          total_price: number
          unit_price: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          org_id?: string | null
          quantity?: number
          quotation_id?: string
          total_price?: number
          unit_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_quotation_items_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotation_items_quotation_id_fkey"
            columns: ["quotation_id"]
            isOneToOne: false
            referencedRelation: "quotations"
            referencedColumns: ["id"]
          },
        ]
      }
      quotations: {
        Row: {
          certification_traceability: Json | null
          commercial_terms: Json | null
          currency: string | null
          delivery_timeframe: string | null
          generated_id: string | null
          id: string
          notes: string | null
          org_id: string | null
          payment_terms: string | null
          quality_requirements: Json | null
          rfq_id: string | null
          specifications: Json | null
          status: string | null
          submission_date: string | null
          total_price: number | null
          valid_until: string | null
          vendor_id: string | null
          warranty_terms: string | null
        }
        Insert: {
          certification_traceability?: Json | null
          commercial_terms?: Json | null
          currency?: string | null
          delivery_timeframe?: string | null
          generated_id?: string | null
          id?: string
          notes?: string | null
          org_id?: string | null
          payment_terms?: string | null
          quality_requirements?: Json | null
          rfq_id?: string | null
          specifications?: Json | null
          status?: string | null
          submission_date?: string | null
          total_price?: number | null
          valid_until?: string | null
          vendor_id?: string | null
          warranty_terms?: string | null
        }
        Update: {
          certification_traceability?: Json | null
          commercial_terms?: Json | null
          currency?: string | null
          delivery_timeframe?: string | null
          generated_id?: string | null
          id?: string
          notes?: string | null
          org_id?: string | null
          payment_terms?: string | null
          quality_requirements?: Json | null
          rfq_id?: string | null
          specifications?: Json | null
          status?: string | null
          submission_date?: string | null
          total_price?: number | null
          valid_until?: string | null
          vendor_id?: string | null
          warranty_terms?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_quotations_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotations_rfq_id_fkey"
            columns: ["rfq_id"]
            isOneToOne: false
            referencedRelation: "rfqs"
            referencedColumns: ["id"]
          },
        ]
      }
      rack_numbers: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          location_id: string | null
          name: string
          org_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          location_id?: string | null
          name: string
          org_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          location_id?: string | null
          name?: string
          org_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rack_numbers_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "gauge_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rack_numbers_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      rfqs: {
        Row: {
          contact_email: string | null
          description: string | null
          due_date: string | null
          generated_id: string
          id: string
          issue_date: string | null
          org_id: string | null
          purchase_request_id: string | null
          specifications: Json | null
          status: string | null
          title: string
          vendor_id: string | null
          vendor_name: string | null
        }
        Insert: {
          contact_email?: string | null
          description?: string | null
          due_date?: string | null
          generated_id: string
          id?: string
          issue_date?: string | null
          org_id?: string | null
          purchase_request_id?: string | null
          specifications?: Json | null
          status?: string | null
          title: string
          vendor_id?: string | null
          vendor_name?: string | null
        }
        Update: {
          contact_email?: string | null
          description?: string | null
          due_date?: string | null
          generated_id?: string
          id?: string
          issue_date?: string | null
          org_id?: string | null
          purchase_request_id?: string | null
          specifications?: Json | null
          status?: string | null
          title?: string
          vendor_id?: string | null
          vendor_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_rfqs_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rfqs_purchase_request_id_fkey"
            columns: ["purchase_request_id"]
            isOneToOne: false
            referencedRelation: "purchase_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rfqs_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          created_at: string
          id: string
          org_id: string | null
          permission_id: string | null
          role: string
        }
        Insert: {
          created_at?: string
          id?: string
          org_id?: string | null
          permission_id?: string | null
          role: string
        }
        Update: {
          created_at?: string
          id?: string
          org_id?: string | null
          permission_id?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_role_permissions_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
        ]
      }
      shelf_numbers: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          location_id: string | null
          name: string
          org_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          location_id?: string | null
          name: string
          org_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          location_id?: string | null
          name?: string
          org_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "shelf_numbers_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "gauge_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shelf_numbers_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_engineer_logs: {
        Row: {
          action_taken_for_failures: string | null
          additional_notes: string | null
          auth_user_id: string | null
          company_name: string
          created_at: string | null
          department: string
          engineer_name: string
          engineer_signature: string | null
          id: string
          inspection_data: Json | null
          org_id: string | null
          reported_to_qc: boolean | null
          sent_for_calibration: boolean | null
          sent_for_repair: boolean | null
          shift_date: string
          shift_type: string
          supervisor_approval: string | null
          total_failed: number | null
          total_inspections: number | null
          total_passed: number | null
          updated_at: string | null
        }
        Insert: {
          action_taken_for_failures?: string | null
          additional_notes?: string | null
          auth_user_id?: string | null
          company_name: string
          created_at?: string | null
          department: string
          engineer_name: string
          engineer_signature?: string | null
          id?: string
          inspection_data?: Json | null
          org_id?: string | null
          reported_to_qc?: boolean | null
          sent_for_calibration?: boolean | null
          sent_for_repair?: boolean | null
          shift_date: string
          shift_type: string
          supervisor_approval?: string | null
          total_failed?: number | null
          total_inspections?: number | null
          total_passed?: number | null
          updated_at?: string | null
        }
        Update: {
          action_taken_for_failures?: string | null
          additional_notes?: string | null
          auth_user_id?: string | null
          company_name?: string
          created_at?: string | null
          department?: string
          engineer_name?: string
          engineer_signature?: string | null
          id?: string
          inspection_data?: Json | null
          org_id?: string | null
          reported_to_qc?: boolean | null
          sent_for_calibration?: boolean | null
          sent_for_repair?: boolean | null
          shift_date?: string
          shift_type?: string
          supervisor_approval?: string | null
          total_failed?: number | null
          total_inspections?: number | null
          total_passed?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shift_engineer_logs_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      spc_data: {
        Row: {
          actions_taken: string | null
          analysis_notes: string | null
          chart_type: string
          collected_by: string | null
          collection_date: string | null
          control_limits: Json | null
          id: string
          measurement_data: Json | null
          org_id: string | null
          out_of_control_points: Json | null
          process_name: string
          sample_size: number | null
        }
        Insert: {
          actions_taken?: string | null
          analysis_notes?: string | null
          chart_type: string
          collected_by?: string | null
          collection_date?: string | null
          control_limits?: Json | null
          id?: string
          measurement_data?: Json | null
          org_id?: string | null
          out_of_control_points?: Json | null
          process_name: string
          sample_size?: number | null
        }
        Update: {
          actions_taken?: string | null
          analysis_notes?: string | null
          chart_type?: string
          collected_by?: string | null
          collection_date?: string | null
          control_limits?: Json | null
          id?: string
          measurement_data?: Json | null
          org_id?: string | null
          out_of_control_points?: Json | null
          process_name?: string
          sample_size?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "spc_data_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      stability_analysis: {
        Row: {
          calculated_results: Json | null
          characteristic: string
          created_at: string
          data_entry_timestamp: string | null
          gauge_id: string
          gauge_name: string
          gauge_no: string
          id: string
          least_count: string
          measurement_data: Json
          org_id: string | null
          part_name: string | null
          part_no: string
          performed_by_user_role_id: string | null
          specification: string
          studied_by: string
          study_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          calculated_results?: Json | null
          characteristic: string
          created_at?: string
          data_entry_timestamp?: string | null
          gauge_id: string
          gauge_name: string
          gauge_no: string
          id?: string
          least_count: string
          measurement_data: Json
          org_id?: string | null
          part_name?: string | null
          part_no: string
          performed_by_user_role_id?: string | null
          specification: string
          studied_by: string
          study_date?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          calculated_results?: Json | null
          characteristic?: string
          created_at?: string
          data_entry_timestamp?: string | null
          gauge_id?: string
          gauge_name?: string
          gauge_no?: string
          id?: string
          least_count?: string
          measurement_data?: Json
          org_id?: string | null
          part_name?: string | null
          part_no?: string
          performed_by_user_role_id?: string | null
          specification?: string
          studied_by?: string
          study_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_stability_analysis_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_stability_analysis_performed_by_user_role"
            columns: ["performed_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      stability_analysis_drafts: {
        Row: {
          created_at: string
          draft_name: string
          form_data: Json
          id: string
          measurement_data: Json
          org_id: string | null
          reading_times: Json | null
          sample_count: number | null
          sample_dates: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          draft_name: string
          form_data?: Json
          id?: string
          measurement_data?: Json
          org_id?: string | null
          reading_times?: Json | null
          sample_count?: number | null
          sample_dates?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          draft_name?: string
          form_data?: Json
          id?: string
          measurement_data?: Json
          org_id?: string | null
          reading_times?: Json | null
          sample_count?: number | null
          sample_dates?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_stability_analysis_drafts_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      stability_analysis_logs: {
        Row: {
          calculated_results: Json
          characteristic: string
          charts_data: Json
          created_at: string
          data_entry_timestamp: string | null
          gauge_name: string
          gauge_no: string
          id: string
          least_count: string | null
          measurement_data: Json
          notes: string | null
          org_id: string | null
          part_no: string
          performed_by_user_role_id: string | null
          reading_times: Json | null
          sample_count: number | null
          sample_dates: Json | null
          specification: string | null
          status: string
          studied_by: string
          study_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          calculated_results?: Json
          characteristic: string
          charts_data?: Json
          created_at?: string
          data_entry_timestamp?: string | null
          gauge_name: string
          gauge_no: string
          id?: string
          least_count?: string | null
          measurement_data?: Json
          notes?: string | null
          org_id?: string | null
          part_no: string
          performed_by_user_role_id?: string | null
          reading_times?: Json | null
          sample_count?: number | null
          sample_dates?: Json | null
          specification?: string | null
          status?: string
          studied_by: string
          study_date: string
          updated_at?: string
          user_id: string
        }
        Update: {
          calculated_results?: Json
          characteristic?: string
          charts_data?: Json
          created_at?: string
          data_entry_timestamp?: string | null
          gauge_name?: string
          gauge_no?: string
          id?: string
          least_count?: string | null
          measurement_data?: Json
          notes?: string | null
          org_id?: string | null
          part_no?: string
          performed_by_user_role_id?: string | null
          reading_times?: Json | null
          sample_count?: number | null
          sample_dates?: Json | null
          specification?: string | null
          status?: string
          studied_by?: string
          study_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_stability_analysis_logs_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stability_analysis_logs_performed_by_user_role_id_fkey"
            columns: ["performed_by_user_role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      storage_locations: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          location_id: string | null
          name: string
          org_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          location_id?: string | null
          name: string
          org_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          location_id?: string | null
          name?: string
          org_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "storage_locations_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "gauge_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "storage_locations_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      supplier_observations: {
        Row: {
          corrective_actions: string | null
          created_at: string
          id: string
          improvements: string | null
          matrix_id: string | null
          next_review_date: string | null
          org_id: string | null
          strengths: string | null
        }
        Insert: {
          corrective_actions?: string | null
          created_at?: string
          id?: string
          improvements?: string | null
          matrix_id?: string | null
          next_review_date?: string | null
          org_id?: string | null
          strengths?: string | null
        }
        Update: {
          corrective_actions?: string | null
          created_at?: string
          id?: string
          improvements?: string | null
          matrix_id?: string | null
          next_review_date?: string | null
          org_id?: string | null
          strengths?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supplier_observations_matrix_id_fkey"
            columns: ["matrix_id"]
            isOneToOne: false
            referencedRelation: "supplier_performance_matrices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_observations_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      supplier_performance_approvals: {
        Row: {
          created_at: string
          date: string | null
          designation: string
          id: string
          matrix_id: string | null
          name: string
          org_id: string | null
          role: string
          signature: boolean
        }
        Insert: {
          created_at?: string
          date?: string | null
          designation: string
          id?: string
          matrix_id?: string | null
          name: string
          org_id?: string | null
          role: string
          signature?: boolean
        }
        Update: {
          created_at?: string
          date?: string | null
          designation?: string
          id?: string
          matrix_id?: string | null
          name?: string
          org_id?: string | null
          role?: string
          signature?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "supplier_performance_approvals_matrix_id_fkey"
            columns: ["matrix_id"]
            isOneToOne: false
            referencedRelation: "supplier_performance_matrices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_performance_approvals_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      supplier_performance_data: {
        Row: {
          calibration_compliance: boolean
          cost_compliance: boolean
          created_at: string
          defect_rate: number
          gauge_quality: number
          id: string
          matrix_id: string | null
          on_time_delivery: boolean
          org_id: string | null
          overall_rating: number
          payment_terms_adherence: boolean
          po_date: string | null
          po_no: string
          remarks: string | null
          response_time: number
          supply_date: string | null
          time_taken: number | null
        }
        Insert: {
          calibration_compliance?: boolean
          cost_compliance?: boolean
          created_at?: string
          defect_rate: number
          gauge_quality: number
          id?: string
          matrix_id?: string | null
          on_time_delivery?: boolean
          org_id?: string | null
          overall_rating: number
          payment_terms_adherence?: boolean
          po_date?: string | null
          po_no: string
          remarks?: string | null
          response_time: number
          supply_date?: string | null
          time_taken?: number | null
        }
        Update: {
          calibration_compliance?: boolean
          cost_compliance?: boolean
          created_at?: string
          defect_rate?: number
          gauge_quality?: number
          id?: string
          matrix_id?: string | null
          on_time_delivery?: boolean
          org_id?: string | null
          overall_rating?: number
          payment_terms_adherence?: boolean
          po_date?: string | null
          po_no?: string
          remarks?: string | null
          response_time?: number
          supply_date?: string | null
          time_taken?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "supplier_performance_data_matrix_id_fkey"
            columns: ["matrix_id"]
            isOneToOne: false
            referencedRelation: "supplier_performance_matrices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_performance_data_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      supplier_performance_matrices: {
        Row: {
          created_at: string
          evaluation_end_date: string | null
          evaluation_start_date: string | null
          id: string
          org_id: string | null
          supplier_id: string
          supplier_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          evaluation_end_date?: string | null
          evaluation_start_date?: string | null
          id?: string
          org_id?: string | null
          supplier_id: string
          supplier_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          evaluation_end_date?: string | null
          evaluation_start_date?: string | null
          id?: string
          org_id?: string | null
          supplier_id?: string
          supplier_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "supplier_performance_matrices_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      supplier_performance_metrics: {
        Row: {
          created_at: string
          formula: string
          id: string
          matrix_id: string | null
          metric: string
          org_id: string | null
          remarks: string | null
          value: number | null
        }
        Insert: {
          created_at?: string
          formula: string
          id?: string
          matrix_id?: string | null
          metric: string
          org_id?: string | null
          remarks?: string | null
          value?: number | null
        }
        Update: {
          created_at?: string
          formula?: string
          id?: string
          matrix_id?: string | null
          metric?: string
          org_id?: string | null
          remarks?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "supplier_performance_metrics_matrix_id_fkey"
            columns: ["matrix_id"]
            isOneToOne: false
            referencedRelation: "supplier_performance_matrices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_performance_metrics_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      system_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          org_id: string | null
          setting_key: string
          setting_value: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          org_id?: string | null
          setting_key: string
          setting_value: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          org_id?: string | null
          setting_key?: string
          setting_value?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_system_settings_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      thread_gauge_inspections: {
        Row: {
          auth_user_id: string | null
          calibration_due_date: string | null
          calibration_status: string | null
          created_at: string | null
          final_disposition: string
          gauge_class: string | null
          gauge_condition: string | null
          gauge_manufacturer: string | null
          gauge_serial_number: string
          gauge_type: string
          go_gauge_result: boolean | null
          id: string
          inspection_date: string
          inspector_name: string
          next_inspection_date: string | null
          nogo_gauge_result: boolean | null
          notes: string | null
          org_id: string | null
          recommendations: string | null
          thread_specification: string | null
          updated_at: string | null
          visual_inspection_result: string | null
        }
        Insert: {
          auth_user_id?: string | null
          calibration_due_date?: string | null
          calibration_status?: string | null
          created_at?: string | null
          final_disposition: string
          gauge_class?: string | null
          gauge_condition?: string | null
          gauge_manufacturer?: string | null
          gauge_serial_number: string
          gauge_type: string
          go_gauge_result?: boolean | null
          id?: string
          inspection_date: string
          inspector_name: string
          next_inspection_date?: string | null
          nogo_gauge_result?: boolean | null
          notes?: string | null
          org_id?: string | null
          recommendations?: string | null
          thread_specification?: string | null
          updated_at?: string | null
          visual_inspection_result?: string | null
        }
        Update: {
          auth_user_id?: string | null
          calibration_due_date?: string | null
          calibration_status?: string | null
          created_at?: string | null
          final_disposition?: string
          gauge_class?: string | null
          gauge_condition?: string | null
          gauge_manufacturer?: string | null
          gauge_serial_number?: string
          gauge_type?: string
          go_gauge_result?: boolean | null
          id?: string
          inspection_date?: string
          inspector_name?: string
          next_inspection_date?: string | null
          nogo_gauge_result?: boolean | null
          notes?: string | null
          org_id?: string | null
          recommendations?: string | null
          thread_specification?: string | null
          updated_at?: string | null
          visual_inspection_result?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_thread_gauge_inspections_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      turnstile_verification_logs: {
        Row: {
          challenge_ts: string | null
          created_at: string
          error_codes: string[] | null
          error_message: string | null
          hostname: string | null
          id: string
          idempotency_key: string | null
          metadata: Json | null
          org_id: string | null
          remote_ip: string | null
          success: boolean
          timestamp: string
          token_hash: string | null
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          challenge_ts?: string | null
          created_at?: string
          error_codes?: string[] | null
          error_message?: string | null
          hostname?: string | null
          id?: string
          idempotency_key?: string | null
          metadata?: Json | null
          org_id?: string | null
          remote_ip?: string | null
          success: boolean
          timestamp?: string
          token_hash?: string | null
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          challenge_ts?: string | null
          created_at?: string
          error_codes?: string[] | null
          error_message?: string | null
          hostname?: string | null
          id?: string
          idempotency_key?: string | null
          metadata?: Json | null
          org_id?: string | null
          remote_ip?: string | null
          success?: boolean
          timestamp?: string
          token_hash?: string | null
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_turnstile_verification_logs_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      units_of_measurement: {
        Row: {
          category: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          org_id: string | null
          unit_code: string
          unit_name: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          org_id?: string | null
          unit_code: string
          unit_name: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          org_id?: string | null
          unit_code?: string
          unit_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_units_of_measurement_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_location_permissions: {
        Row: {
          can_access: boolean
          created_at: string | null
          granted_at: string | null
          granted_by: string | null
          id: string
          location_id: string
          org_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          can_access?: boolean
          created_at?: string | null
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          location_id: string
          org_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          can_access?: boolean
          created_at?: string | null
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          location_id?: string
          org_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_user_location_permissions_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_location_permissions_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "gauge_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_location_permissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_logs: {
        Row: {
          action_details: Json | null
          action_type: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          module_name: string | null
          org_id: string
          record_id: string | null
          record_type: string | null
          timestamp: string | null
          updated_at: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action_details?: Json | null
          action_type: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          module_name?: string | null
          org_id?: string
          record_id?: string | null
          record_type?: string | null
          timestamp?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action_details?: Json | null
          action_type?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          module_name?: string | null
          org_id?: string
          record_id?: string | null
          record_type?: string | null
          timestamp?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_logs_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_module_permissions: {
        Row: {
          created_at: string
          granted_at: string
          granted_by: string | null
          id: string
          module_permissions: Json
          org_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          granted_at?: string
          granted_by?: string | null
          id?: string
          module_permissions?: Json
          org_id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          granted_at?: string
          granted_by?: string | null
          id?: string
          module_permissions?: Json
          org_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_user_module_permissions_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_module_permissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_permissions: {
        Row: {
          created_at: string
          granted: boolean | null
          granted_by: string | null
          id: string
          org_id: string | null
          permission_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          granted?: boolean | null
          granted_by?: string | null
          id?: string
          org_id?: string | null
          permission_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          granted?: boolean | null
          granted_by?: string | null
          id?: string
          org_id?: string | null
          permission_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_permissions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string
          created_by: string | null
          department: string | null
          emergency_contact: string | null
          emergency_phone: string | null
          first_name: string | null
          hire_date: string | null
          id: string
          last_name: string | null
          manager_id: string | null
          org_id: string | null
          organization_id: string | null
          phone: string | null
          position: string | null
          signature_url: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          department?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          first_name?: string | null
          hire_date?: string | null
          id?: string
          last_name?: string | null
          manager_id?: string | null
          org_id?: string | null
          organization_id?: string | null
          phone?: string | null
          position?: string | null
          signature_url?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          department?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          first_name?: string | null
          hire_date?: string | null
          id?: string
          last_name?: string | null
          manager_id?: string | null
          org_id?: string | null
          organization_id?: string | null
          phone?: string | null
          position?: string | null
          signature_url?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_user_profiles_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_profiles_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organization_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          auth_user_id: string | null
          contact_number: string | null
          created_at: string | null
          department: string | null
          email: string | null
          id: string
          is_active: boolean | null
          joining_date: string | null
          name: string | null
          org_id: string | null
          password: string
          password_hash: string | null
          role: string
          role_title: string | null
          signature_url: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          auth_user_id?: string | null
          contact_number?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          joining_date?: string | null
          name?: string | null
          org_id?: string | null
          password: string
          password_hash?: string | null
          role: string
          role_title?: string | null
          signature_url?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          auth_user_id?: string | null
          contact_number?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          joining_date?: string | null
          name?: string | null
          org_id?: string | null
          password?: string
          password_hash?: string | null
          role?: string
          role_title?: string | null
          signature_url?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          org_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          org_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          org_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_vendor_categories_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_category_mappings: {
        Row: {
          category_id: string
          created_at: string
          id: string
          org_id: string | null
          vendor_id: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          org_id?: string | null
          vendor_id: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          org_id?: string | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_vendor_category_mappings_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_category_mappings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "vendor_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_category_mappings_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_requirement_responses: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          id: string
          org_id: string | null
          quotation_id: string | null
          remarks: string | null
          response: string
          specification_key: string
          specification_label: string
          specification_value: string | null
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          id?: string
          org_id?: string | null
          quotation_id?: string | null
          remarks?: string | null
          response?: string
          specification_key: string
          specification_label: string
          specification_value?: string | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          id?: string
          org_id?: string | null
          quotation_id?: string | null
          remarks?: string | null
          response?: string
          specification_key?: string
          specification_label?: string
          specification_value?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_requirement_responses_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_requirement_responses_quotation_id_fkey"
            columns: ["quotation_id"]
            isOneToOne: false
            referencedRelation: "quotations"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_rfq_mappings: {
        Row: {
          created_at: string | null
          id: string
          org_id: string | null
          response_date: string | null
          rfq_id: string
          sent_date: string | null
          status: string
          updated_at: string | null
          vendor_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          org_id?: string | null
          response_date?: string | null
          rfq_id: string
          sent_date?: string | null
          status?: string
          updated_at?: string | null
          vendor_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          org_id?: string | null
          response_date?: string | null
          rfq_id?: string
          sent_date?: string | null
          status?: string
          updated_at?: string | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_vendor_rfq_mappings_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_rfq_mappings_rfq_id_fkey"
            columns: ["rfq_id"]
            isOneToOne: false
            referencedRelation: "rfqs"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_specification_responses: {
        Row: {
          accepted: string | null
          category: string | null
          created_at: string | null
          created_by: string | null
          field_name: string
          id: string
          org_id: string | null
          quotation_id: string | null
          remarks: string | null
          updated_at: string | null
        }
        Insert: {
          accepted?: string | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          field_name: string
          id?: string
          org_id?: string | null
          quotation_id?: string | null
          remarks?: string | null
          updated_at?: string | null
        }
        Update: {
          accepted?: string | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          field_name?: string
          id?: string
          org_id?: string | null
          quotation_id?: string | null
          remarks?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_vendor_specification_responses_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_specification_responses_quotation_id_fkey"
            columns: ["quotation_id"]
            isOneToOne: false
            referencedRelation: "quotations"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          aadhaar_number: string
          account_holder_name: string
          account_number: string
          account_type: string
          address_proof_document: string | null
          address_proof_type: string
          application_date: string
          application_type: string
          bank_name: string
          branch_name: string
          business_documents: Json | null
          business_email: string
          business_name: string
          business_phone: string
          cin: string | null
          created_at: string
          created_by: string | null
          date_of_incorporation: string | null
          date_of_verification: string | null
          declaration: boolean
          designation: string
          document_expiry_dates: Json | null
          document_upload_dates: Json | null
          document_verification_remarks: Json | null
          document_verification_status: Json | null
          email: string
          gstin: string | null
          id: string
          id_proof_document: string | null
          id_proof_type: string
          ifsc_code: string
          kyc_verified_by: string | null
          legal_entity_type: string
          micr_code: string | null
          mobile_number: string
          nature_of_business: string
          number_of_employees: number | null
          operating_address_line1: string | null
          operating_address_line2: string | null
          operating_city: string | null
          operating_pin_code: string | null
          operating_state: string | null
          org_id: string | null
          other_entity_type: string | null
          other_nature_of_business: string | null
          pan: string
          registered_address_line1: string
          registered_address_line2: string | null
          registered_city: string
          registered_pin_code: string
          registered_state: string
          residential_address_line1: string
          residential_address_line2: string | null
          residential_city: string
          residential_pin_code: string
          residential_state: string
          signatory_name: string
          signatory_pan: string
          signature_date: string
          status: string
          updated_at: string | null
          vendor_id: string
          verification_remarks: string | null
          website: string | null
        }
        Insert: {
          aadhaar_number: string
          account_holder_name: string
          account_number: string
          account_type: string
          address_proof_document?: string | null
          address_proof_type: string
          application_date: string
          application_type: string
          bank_name: string
          branch_name: string
          business_documents?: Json | null
          business_email: string
          business_name: string
          business_phone: string
          cin?: string | null
          created_at?: string
          created_by?: string | null
          date_of_incorporation?: string | null
          date_of_verification?: string | null
          declaration?: boolean
          designation: string
          document_expiry_dates?: Json | null
          document_upload_dates?: Json | null
          document_verification_remarks?: Json | null
          document_verification_status?: Json | null
          email: string
          gstin?: string | null
          id?: string
          id_proof_document?: string | null
          id_proof_type: string
          ifsc_code: string
          kyc_verified_by?: string | null
          legal_entity_type: string
          micr_code?: string | null
          mobile_number: string
          nature_of_business: string
          number_of_employees?: number | null
          operating_address_line1?: string | null
          operating_address_line2?: string | null
          operating_city?: string | null
          operating_pin_code?: string | null
          operating_state?: string | null
          org_id?: string | null
          other_entity_type?: string | null
          other_nature_of_business?: string | null
          pan: string
          registered_address_line1: string
          registered_address_line2?: string | null
          registered_city: string
          registered_pin_code: string
          registered_state: string
          residential_address_line1: string
          residential_address_line2?: string | null
          residential_city: string
          residential_pin_code: string
          residential_state: string
          signatory_name: string
          signatory_pan: string
          signature_date: string
          status?: string
          updated_at?: string | null
          vendor_id: string
          verification_remarks?: string | null
          website?: string | null
        }
        Update: {
          aadhaar_number?: string
          account_holder_name?: string
          account_number?: string
          account_type?: string
          address_proof_document?: string | null
          address_proof_type?: string
          application_date?: string
          application_type?: string
          bank_name?: string
          branch_name?: string
          business_documents?: Json | null
          business_email?: string
          business_name?: string
          business_phone?: string
          cin?: string | null
          created_at?: string
          created_by?: string | null
          date_of_incorporation?: string | null
          date_of_verification?: string | null
          declaration?: boolean
          designation?: string
          document_expiry_dates?: Json | null
          document_upload_dates?: Json | null
          document_verification_remarks?: Json | null
          document_verification_status?: Json | null
          email?: string
          gstin?: string | null
          id?: string
          id_proof_document?: string | null
          id_proof_type?: string
          ifsc_code?: string
          kyc_verified_by?: string | null
          legal_entity_type?: string
          micr_code?: string | null
          mobile_number?: string
          nature_of_business?: string
          number_of_employees?: number | null
          operating_address_line1?: string | null
          operating_address_line2?: string | null
          operating_city?: string | null
          operating_pin_code?: string | null
          operating_state?: string | null
          org_id?: string | null
          other_entity_type?: string | null
          other_nature_of_business?: string | null
          pan?: string
          registered_address_line1?: string
          registered_address_line2?: string | null
          registered_city?: string
          registered_pin_code?: string
          registered_state?: string
          residential_address_line1?: string
          residential_address_line2?: string | null
          residential_city?: string
          residential_pin_code?: string
          residential_state?: string
          signatory_name?: string
          signatory_pan?: string
          signature_date?: string
          status?: string
          updated_at?: string | null
          vendor_id?: string
          verification_remarks?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_vendors_org_id"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization_locations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authenticate_by_username: {
        Args: { p_password: string; p_username: string }
        Returns: {
          auth_user_id: string
          contact_number: string
          created_at: string
          department: string
          email: string
          is_active: boolean
          joining_date: string
          name: string
          org_id: string
          role_title: string
          updated_at: string
          user_id: string
          username: string
        }[]
      }
      check_concurrent_user_limit: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      check_gauge_limit: {
        Args: { additional_gauges?: number }
        Returns: Json
      }
      cleanup_expired_reset_tokens: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      cleanup_expired_sessions: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      cleanup_expired_verifications: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      cleanup_stale_sessions: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      create_auth_user_and_link: {
        Args: {
          p_contact_number?: string
          p_email: string
          p_name: string
          p_password: string
          p_role_title: string
          p_username: string
        }
        Returns: Json
      }
      create_standard_org_policies: {
        Args: { table_name: string }
        Returns: undefined
      }
      create_user_with_auth: {
        Args: {
          p_contact_number?: string
          p_name: string
          p_password: string
          p_role_title: string
          p_username: string
        }
        Returns: string
      }
      debug_rls_policy_check: {
        Args: { test_org_id: string }
        Returns: {
          auth_uid_exists: boolean
          can_insert: boolean
          org_id_match: boolean
          user_active: boolean
          user_roles_match: boolean
        }[]
      }
      debug_user_context: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      delete_gauge_with_transactions: {
        Args: { gauge_id_param: string }
        Returns: boolean
      }
      delete_user_session_by_id: {
        Args: { session_id_param: string }
        Returns: boolean
      }
      diagnose_current_user_state: {
        Args: Record<PropertyKey, never>
        Returns: {
          diagnosis: string
          value: string
        }[]
      }
      ensure_organization_isolation: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      force_logout_user_sessions: {
        Args: { target_user_id: string }
        Returns: number
      }
      generate_calibration_report_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_calibration_transaction_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_grn_document_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_grn_serial_numbers: {
        Args: { p_grn_id: string }
        Returns: undefined
      }
      generate_instrument_equipment_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_instrument_request_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_internal_email: {
        Args: { username: string }
        Returns: string
      }
      generate_next_id: {
        Args: { eq_type: string }
        Returns: string
      }
      generate_nomenclature_id: {
        Args: { p_nomenclature_code: string }
        Returns: string
      }
      generate_scrap_report_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_current_gauge_count: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_current_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_current_user_org_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_current_user_org_id_cached: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_current_user_org_id_safe: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_current_user_org_id_simple: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_default_organization_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_gauge_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_session_user_org_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_org_id_for_bias_analysis: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_organization: {
        Args: { user_id?: string }
        Returns: string
      }
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      handle_purchase_request_resubmission: {
        Args: {
          p_purchase_request_id: string
          p_user_id: string
          p_user_name: string
        }
        Returns: string
      }
      initialize_organization_context: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      is_current_user_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_system_admin: {
        Args: { user_id?: string }
        Returns: boolean
      }
      is_system_admin_user: {
        Args: { user_id?: string }
        Returns: boolean
      }
      link_user_role_with_auth: {
        Args: { p_auth_user_id: string; p_user_role_id: string }
        Returns: boolean
      }
      log_approval_transaction: {
        Args:
          | {
              p_action_type: string
              p_approval_request_id: string
              p_details?: Json
              p_metadata?: Json
              p_performed_by: string
              p_performed_by_name: string
              p_performed_by_user_role_id?: string
              p_purchase_request_id: string
            }
          | {
              p_action_type: string
              p_approval_request_id: string
              p_details?: Json
              p_metadata?: Json
              p_performed_by: string
              p_performed_by_name: string
              p_purchase_request_id: string
            }
        Returns: string
      }
      log_broken_gauge_repair_approval_transaction: {
        Args: {
          p_action_type: string
          p_approval_id: string
          p_broken_gauge_repair_request_id: string
          p_details?: Json
          p_metadata?: Json
          p_performed_by: string
          p_performed_by_name: string
        }
        Returns: string
      }
      log_calibration_approval_transaction: {
        Args: {
          p_action_type: string
          p_approval_id: string
          p_details?: Json
          p_performed_by: string
          p_performed_by_name: string
        }
        Returns: string
      }
      log_calibration_cycle_change: {
        Args: {
          p_action_type: string
          p_calibration_history_id: string
          p_changes_made?: Json
          p_cycle_id: string
          p_performed_by: string
          p_performed_by_name: string
          p_previous_values?: Json
        }
        Returns: string
      }
      log_calibration_request_approval_transaction: {
        Args: {
          p_action_type: string
          p_approval_id: string
          p_calibration_request_id: string
          p_details?: Json
          p_metadata?: Json
          p_performed_by: string
          p_performed_by_name: string
        }
        Returns: string
      }
      log_grn_inspection_approval_transaction: {
        Args: {
          p_action_type: string
          p_details?: Json
          p_grn_inspection_approval_id: string
          p_metadata?: Json
          p_performed_by: string
          p_performed_by_name: string
        }
        Returns: string
      }
      log_instruments_equipment_approval_transaction: {
        Args: {
          p_action_type: string
          p_approval_request_id: string
          p_details?: Json
          p_instruments_equipment_request_id: string
          p_metadata?: Json
          p_performed_by: string
          p_performed_by_name: string
        }
        Returns: string
      }
      maintain_organization_isolation: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      migrate_pending_calibration_cycles: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      refresh_user_session_context: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      set_session_variables: {
        Args: { org_id: string; user_email: string; user_id: string }
        Returns: undefined
      }
      set_session_variables_v2: {
        Args: { p_org_id: string; p_user_email: string; p_user_id: string }
        Returns: undefined
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
      update_cycle_data_with_report_ids: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      user_has_org_access: {
        Args: { target_org_id: string }
        Returns: boolean
      }
      verify_email_token: {
        Args: { p_token: string }
        Returns: Json
      }
      verify_org_policies: {
        Args: Record<PropertyKey, never>
        Returns: {
          missing_policy: string
        }[]
      }
    }
    Enums: {
      app_role:
        | "system_admin"
        | "distributor_admin"
        | "distributor_manager"
        | "distributor_support"
        | "client_admin"
        | "supervisor"
        | "technician"
        | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "system_admin",
        "distributor_admin",
        "distributor_manager",
        "distributor_support",
        "client_admin",
        "supervisor",
        "technician",
        "viewer",
      ],
    },
  },
} as const
